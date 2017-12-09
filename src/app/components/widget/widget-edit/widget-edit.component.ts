import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit, AfterViewInit {

  @ViewChild('ref') child;

  developerId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.developerId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
            this.widget = data;
          });
        }
      );
  }

  ngAfterViewInit(): void {
  }

  onDelete() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(() => {
    });
    this.router.navigate(['user', this.developerId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }

  submit() {
    this.widget = this.child.getWidget();
    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((data: any) => {});
    return this.router.navigate(['user', this.developerId, 'website', this.websiteId, 'page', this.pageId, 'widget'])
  }
}
