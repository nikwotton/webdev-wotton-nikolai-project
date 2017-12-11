import {Component, OnInit, ViewChild} from '@angular/core';
import {MemeService} from '../../../services/meme.service.client';
import {ImageService} from '../../../services/image.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  memes: any;
  memeUrls = {};
  user: String;
  searchMessage = '';

  constructor(private memeService: MemeService, private imageService: ImageService,
              private activatedRoute: ActivatedRoute, private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.user = params['uid'];
      this.memeService.findAllMemes().subscribe((memes: any) => {
        if (this.user === undefined) {
          this.memes = memes;
        } else {
          this.memes = memes.filter(m => m.poster === this.user);
        }
        this.memes.forEach(meme => {
            this.imageService.findImageById(meme.image).subscribe(image => {
              this.memeUrls[meme._id] = this.memeService.getMemeUrl(image.imageUrl, meme.topText, meme.bottomText);
            });
          }
        );
      });
    });
  }

  getMeme(meme: any) {
    return this.memeUrls[meme._id];
  }

  updateSearch() {
    if (this.form.value.search === '') {
      this.searchMessage = '';
      return this.router.navigate(['/memes']);
    }
    this.userService.findUserByUsername(this.form.value.search).subscribe((data: any) => {
      if (data === null) {
        this.searchMessage = 'Username not found';
        return;
      }
      this.searchMessage = '';
      return this.router.navigate(['/memes/search/' + data._id]);
    });
  }
}
