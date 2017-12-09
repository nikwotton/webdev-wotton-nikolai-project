import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class PageService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createPage': this.createPage,
    'findPageById': this.findPageById,
    'findPagesByWebsiteId': this.findPagesByWebsiteId,
    'updatePage': this.updatePage,
    'deletePage': this.deletePage
  };

  createPage(websiteId: string, page: any) {
    return this.http.post(this.baseUrl + '/api/website/' + websiteId + '/page', page)
      .map((res: Response) => {
        return res.json();
      });
  }

  findPagesByWebsiteId(websiteId: string) {
    return this.http.get(this.baseUrl + '/api/website/' + websiteId + '/page')
      .map((res: Response) => {
        return res.json();
      });
  }

  findPageById(pageId: string) {
    return this.http.get(this.baseUrl + '/api/page/' + pageId)
      .map((res: Response) => {
        return res.json();
      });
  }

  updatePage(pageId: string, page: any) {
    return this.http.put(this.baseUrl + '/api/page/' + pageId, page)
      .map((res: Response) => {
        return res.json();
      });
  }

  deletePage(pageId: string) {
    return this.http.delete(this.baseUrl + '/api/page/' + pageId)
      .map((res: Response) => {
        return res.json();
      });
  }
}
