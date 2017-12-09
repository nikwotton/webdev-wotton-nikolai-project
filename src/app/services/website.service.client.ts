import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class WebsiteService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createWebsite': this.createWebsite,
    'findWebsitesByUser': this.findWebsitesByUser,
    'findWebsiteById': this.findWebsiteById,
    'updateWebsite': this.updateWebsite,
    'deleteWebsite': this.deleteWebsite
  };

  createWebsite(userId: string, website: any) {
    return this.http.post(this.baseUrl + '/api/user/' + userId + '/website', website)
      .map((res: Response) => {
        return res.json();
      });
  }

  findWebsiteById(websiteId: string) {
    return this.http.get(this.baseUrl + '/api/website/' + websiteId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findWebsitesByUser(userId: string) {
    return this.http.get(this.baseUrl + '/api/user/' + userId + '/website')
      .map((res: Response) => {
        return res.json();
      });
  }

  updateWebsite(websiteId: string, website: any) {
    return this.http.put(this.baseUrl + '/api/website/' + websiteId, website)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteWebsite(websiteId: string) {
    return this.http.delete(this.baseUrl + '/api/website/' + websiteId)
      .map((res: Response) => {
        return res.json();
      });
  }
}
