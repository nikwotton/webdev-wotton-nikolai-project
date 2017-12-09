import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  websiteId: string;
  websites: any = [];
  website: any = {};

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.websiteService.findWebsitesByUser(this.userId).subscribe((data: any) => {
            this.websites = data;
          });
          this.websiteService.findWebsiteById(this.websiteId).subscribe((data: any) => {
            this.website = data;
          });
        }
      );
  }

  submit() {
    this.website['name'] = this.form.value.name;
    this.website['description'] = this.form.value.description;
    this.websiteService.updateWebsite(this.websiteId, this.website).subscribe(() => {
    });
    return this.router.navigate(['user', this.userId, 'website']);
  }

  onDelete() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe(() => {
    });
    return this.router.navigate(['user', this.userId, 'website']);
  }

}
