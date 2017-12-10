import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  errorFlag = false;
  errorMsg = 'You have an error';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    const p1 = this.form.value.password;
    const p2 = this.form.value.verify;
    if (p1 !== p2) {
      this.errorFlag = true;
      this.errorMsg = 'Passwords do not match';
      return;
    }
    if (this.form.value.type === 'type') {
      this.errorFlag = true;
      this.errorMsg = 'Please select either student or teacher';
      return;
    }
    // if (this.form.value.type )
    this.userService.register(this.form.value.username, p1, this.form.value.type)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.errorFlag = true;
          if (error._body !== '') {
            this.errorMsg = error._body;
          } else {
            this.errorMsg = 'Username ' + this.form.value.username + ' is already taken';
          }
        }
      );
  }
}
