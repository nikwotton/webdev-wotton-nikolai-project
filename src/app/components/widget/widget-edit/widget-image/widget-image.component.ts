import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  @Output() notify: EventEmitter<String> = new EventEmitter<String>();

  developerId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
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
    this.widget['text'] = this.form.value.text;
    this.widget['url'] = this.form.value.url;
    this.widget['width'] = this.form.value.width;
    return this.widget;
  }
}
