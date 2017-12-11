import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ImageService} from '../../../services/image.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  users: any;
  searchMessage = '';

  constructor(private userService: UserService, private imageService: ImageService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  updateSearch() {
    if (this.form.value.search === '') {
      this.searchMessage = '';
      return;
    }
    this.userService.findUserByUsername(this.form.value.search).subscribe((data: any) => {
      if (data === null) {
        this.searchMessage = 'Username not found';
        return;
      }
      this.searchMessage = '';
      return this.router.navigate(['/users/' + data._id]);
    });
  }
}
