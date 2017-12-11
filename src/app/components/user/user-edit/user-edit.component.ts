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
  user = {};
  errorFlag = false;
  errorMsg = 'You have an error';
  type = '';
  newUser = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          if (this.userId !== 'new') {
            this.userService.findUserById(this.userId).subscribe((data: any) => {
              this.type = data.type;
              this.user = data;
            });
          } else {
            this.newUser = true;
          }
        }
      );
  }

  submit() {
    this.userService.findUserByUsername(this.form.value.username).subscribe((data: any) => {
      if ((this.newUser && data != null && data._id !== this.userId) || (!this.newUser && data != null)) {
        this.errorFlag = true;
        this.errorMsg = 'That username is already taken';
        return;
      }
      if (this.newUser) {
        this.userService.registerByAdmin(this.form.value.username, this.form.value.password, this.form.value.type).subscribe(() => {
        });
      } else {
        this.user['username'] = this.form.value.username;
        this.user['firstName'] = this.form.value.firstName;
        this.user['lastName'] = this.form.value.lastName;
        this.user['type'] = this.form.value.type;
        this.userService.updateUser(this.userId, this.user).subscribe(() => {
        });
      }
      this.errorMsg = 'User Successfully Updated!';
      this.errorFlag = true;
      return this.router.navigate(['/users']);
    });
  }

  onDelete() {
    if (!this.newUser) {
      this.userService.deleteUser(this.userId).subscribe(() => {
      });
    }
    return this.router.navigate(['/users']);
  }
}
