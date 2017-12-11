import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';

@Injectable()

export class CommentService {

  constructor(private http: Http, private sharedService: SharedService) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createComment': this.createComment,
    'findCommentById': this.findCommentById,
    'findAllCommentsForMeme': this.findAllCommentsForMeme,
    'updateComment': this.updateComment,
    'deleteComment': this.deleteComment
  };

  createComment(comment: any) {
    return this.http.post(this.baseUrl + '/api/comment', comment)
      .map((res: Response) => {
        return res.json();
      });
  }

  findCommentById(commentId: string) {
    return this.http.get(this.baseUrl + '/api/comment/' + commentId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findAllCommentsForMeme(memeId: string) {
    return this.http.get(this.baseUrl + '/api/comments/' + memeId)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateComment(commentId: string, comment: any) {
    return this.http.put(this.baseUrl + '/api/comment/' + commentId, comment)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteComment(commentId: string) {
    return this.http.delete(this.baseUrl + '/api/comment/' + commentId)
      .map((res: Response) => {
        return res.json();
      });
  }
}
