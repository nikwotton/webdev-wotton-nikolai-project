import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

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
    this.widget['text'] = this.form.value.text;
    this.widget['rows'] = this.form.value.rows;
    this.widget['name'] = this.form.value.name;
    this.widget['placeholder'] = this.form.value.placeholder;
    this.widget['formatted'] = this.form.value.formatted;
    return this.widget;
  }
}
