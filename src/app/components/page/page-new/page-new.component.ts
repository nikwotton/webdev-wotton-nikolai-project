import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  websiteId: string;
  errorMsg = 'Please enter a Page name and Page title';

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
  }

  submit() {
    const page = {'name': this.form.value.name, 'description': this.form.value.title};
    this.pageService.createPage(this.websiteId, page).subscribe(() => {
    });
    return this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page']);
  }
}
