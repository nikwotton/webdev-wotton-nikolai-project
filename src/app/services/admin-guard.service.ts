import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from './user.service.client';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate() {
    // console.log(this.userService.loggedIn());
    // console.log(this.sharedService.user['type'] === 'admin');
    // console.log(this.sharedService.user);
    // return this.sharedService.user['type'] === 'admin';
    // return true;
    return this.userService.isAdmin();
  }
}
