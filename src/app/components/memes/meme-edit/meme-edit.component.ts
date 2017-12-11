import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeService} from '../../../services/meme.service.client';
import {NgForm} from '@angular/forms';
import {ImageService} from '../../../services/image.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';
import {CommentService} from '../../../services/comment.service.client';

@Component({
  selector: 'app-meme-edit',
  templateUrl: './meme-edit.component.html',
  styleUrls: ['./meme-edit.component.css']
})
export class MemeEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  @ViewChild('f2') commentForm: NgForm;

  memeId: string;
  meme: any = {};
  memeUrl = '';
  isMine = false;
  authorName = '';
  comments: any;
  commentOwners = {};

  constructor(private memeService: MemeService, private activatedRoute: ActivatedRoute, private router: Router,
              private imageService: ImageService, private sharedService: SharedService, private userService: UserService,
              private commentService: CommentService) {
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
          this.commentService.findAllCommentsForMeme(this.memeId).subscribe((data: any) => {
            this.comments = data;
            this.comments.forEach(comment => {
              this.userService.findUserById(comment.poster).subscribe((user: any) => {
                this.commentOwners[comment._id] = user.username;
              });
            });
          });
        }
      );
  }

  myComment(comment) {
    return comment.poster === this.sharedService.user['_id'];
  }

  isAdmin() {
    return this.sharedService.user['type'] === 'admin';
  }

  whoseComment(comment) {
    return this.commentOwners[comment._id];
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

  delete(comment) {
    this.commentService.deleteComment(comment._id).subscribe(() => {
    });
    this.ngOnInit();
  }

  submitComment() {
    const comment = {'comment': this.commentForm.value.comment, 'meme': this.memeId, 'poster': this.sharedService.user['_id']};
    this.commentService.createComment(comment).subscribe(() => {
    });
    this.commentForm.setValue({'comment': ''});
    this.ngOnInit();
  }
}
