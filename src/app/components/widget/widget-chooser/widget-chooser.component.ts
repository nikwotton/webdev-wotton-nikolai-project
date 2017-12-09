import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
  }

  submit(type: string) {
    this.widgetService.createWidget(this.pageId, {'type': type}).subscribe((data: any) => {
      return this.router.navigate(['user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', data._id]);
    });
  }
}
