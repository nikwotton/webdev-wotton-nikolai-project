import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeService} from '../../../services/meme.service.client';
import {NgForm} from '@angular/forms';
import {ImageService} from '../../../services/image.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-meme-edit',
  templateUrl: './meme-edit.component.html',
  styleUrls: ['./meme-edit.component.css']
})
export class MemeEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  memeId: string;
  meme: any = {};
  memeUrl = '';
  isMine = false;
  authorName = '';

  constructor(private memeService: MemeService, private activatedRoute: ActivatedRoute, private router: Router,
              private imageService: ImageService, private sharedService: SharedService, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.memeId = params['mid'];
          this.memeService.findMemeById(this.memeId).subscribe((data: any) => {
            this.meme = data;
            this.imageService.findImageById(this.meme.image).subscribe(image => {
              this.memeUrl = this.memeService.getMemeUrl(image.imageUrl, this.meme.topText, this.meme.bottomText);
              this.isMine = this.meme.poster === this.sharedService.user['_id'] || this.sharedService.user['type'] === 'admin';
              this.userService.findUserById(this.meme.poster).subscribe((user: any) => {
                this.authorName = user.username;
              });
            });
          });
        }
      );
  }

  submit() {
    if (!this.isMine) {
      return;
    }
    this.meme['topText'] = this.form.value.top;
    this.meme['bottomText'] = this.form.value.bottom;
    this.meme['description'] = this.form.value.description;
    this.memeService.updateMeme(this.memeId, this.meme).subscribe(() => {
    });
    return this.router.navigate(['/memes']);
  }

  onDelete() {
    if (!this.isMine) {
      return;
    }
    this.memeService.deleteMeme(this.memeId).subscribe(() => {
    });
    return this.router.navigate(['/memes']);
  }
}
