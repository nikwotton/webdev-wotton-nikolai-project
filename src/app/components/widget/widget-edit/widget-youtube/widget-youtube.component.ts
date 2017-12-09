import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  @Output() notify: EventEmitter<String> = new EventEmitter<String>();

  developerId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.developerId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
        this.widget = data;
      });
    });
  }

  getWidget() {
    this.widget['name'] = this.form.value.name;
    this.widget['url'] = this.form.value.url;
    this.widget['width'] = this.form.value.width;
    return this.widget;
  }
}
