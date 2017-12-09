import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  websites: any;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteService.findWebsitesByUser(this.userId).subscribe((data: any) => {
            this.websites = data;
          });
        }
      );
  }

  submit() {
    const website = {'name': this.form.value.name, 'description': this.form.value.description};
    this.websiteService.createWebsite(this.userId, website).subscribe(() => {
    });
    return this.router.navigate(['user', this.userId, 'website']);
  }

}
