import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class WidgetService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  api = {
    'createWidget': this.createWidget,
    'findWidgetById': this.findWidgetById,
    'findWidgetsByPageId': this.findWidgetsByPageId,
    'updateWidget': this.updateWidget,
    'deleteWidget': this.deleteWidget
  };

  createWidget(pageId: string, widget: any) {
    return this.http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map((res: Response) => {
        return res.json();
      });
  }

  findWidgetsByPageId(pageId: string) {
    return this.http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map((res: Response) => {
        return res.json();
      });
  }

  findWidgetById(widgetId: string) {
    return this.http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateWidget(widgetId: string, widget: any) {
    return this.http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteWidget(widgetId: string) {
    return this.http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map((res: Response) => {
        return res.json();
      });
  }
}
