import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  user: any;
  errorFlag = false;
  errorMsg = 'You have an error';
  isAdmin = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.isAdmin = this.user.type === 'admin';
  }

  submit() {
    this.userService.findUserByUsername(this.form.value.username).subscribe((data: any) => {
      if (data != null && data._id !== this.userId) {
        this.errorFlag = true;
        this.errorMsg = 'That username is already taken';
        return;
      }
      this.user['username'] = this.form.value.username;
      this.user['firstName'] = this.form.value.firstName;
      this.user['lastName'] = this.form.value.lastName;
      this.userService.updateUser(this.userId, this.user).subscribe(() => {
      });
      this.errorMsg = 'User Successfully Updated!';
      this.errorFlag = true;
      return this.router.navigate(['/profile']);
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }
}
