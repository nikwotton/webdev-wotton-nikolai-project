import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';

@Injectable()

export class MemeService {

  constructor(private http: Http, private sharedService: SharedService) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createMeme': this.createMeme,
    'findAllMemes': this.findAllMemes,
    'findMemeById': this.findMemeById,
    'updateMeme': this.updateMeme,
    'deleteMeme': this.deleteMeme,
    'getMemeUrl': this.getMemeUrl
  };

  createMeme(meme: any) {
    return this.http.post(this.baseUrl + '/api/meme', meme)
      .map((res: Response) => {
        return res.json();
      });
  }

  findMemeById(memeId: string) {
    return this.http.get(this.baseUrl + '/api/meme/' + memeId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findAllMemes() {
    return this.http.get(this.baseUrl + '/api/meme')
      .map((res: Response) => {
        return res.json();
      });
  }

  updateMeme(memeId: string, meme: any) {
    return this.http.put(this.baseUrl + '/api/meme/' + memeId, meme)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteMeme(memeId: string) {
    return this.http.delete(this.baseUrl + '/api/meme/' + memeId)
      .map((res: Response) => {
        return res.json();
      });
  }

  getMemeUrl(url: String, top: String, bottom: String) {
    return 'https://memegen.link/custom/' + top + '/' + bottom + '.jpg?alt=' + url;
  }
}
