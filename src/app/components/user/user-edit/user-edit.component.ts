import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  user: any;
  errorFlag = false;
  errorMsg = 'You have an error';
  type = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.userService.findUserById(this.userId).subscribe((data: any) => {
            this.type = data.type;
            this.user = data;
          });
        }
      );
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
      this.user['type'] = this.form.value.type;
      this.userService.updateUser(this.userId, this.user).subscribe(() => {
      });
      this.errorMsg = 'User Successfully Updated!';
      this.errorFlag = true;
      return this.router.navigate(['/users']);
    });
  }

  onDelete() {
    this.userService.deleteUser(this.userId).subscribe(() => {
    });
    return this.router.navigate(['/users']);
  }

}
