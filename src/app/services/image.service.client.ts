import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';

@Injectable()

export class ImageService {

  constructor(private http: Http, private sharedService: SharedService) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createImage': this.createImage,
    'findAllImages': this.findAllImages,
    'findImageById': this.findImageById,
    'updateImage': this.updateImage,
    'deleteImage': this.deleteImage
  };

  createImage(image: any) {
    return this.http.post(this.baseUrl + '/api/image', image)
      .map((res: Response) => {
        return res.json();
      });
  }

  findImageById(imageId: string) {
    return this.http.get(this.baseUrl + '/api/image/' + imageId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findAllImages() {
    return this.http.get(this.baseUrl + '/api/image')
      .map((res: Response) => {
        return res.json();
      });
  }

  updateImage(imageId: string, image: any) {
    return this.http.put(this.baseUrl + '/api/image/' + imageId, image)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteImage(imageId: string) {
    return this.http.delete(this.baseUrl + '/api/image/' + imageId)
      .map((res: Response) => {
        return res.json();
      });
  }
}
