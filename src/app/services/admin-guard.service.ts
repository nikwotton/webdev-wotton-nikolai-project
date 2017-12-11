import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service.client';
import {SharedService} from './shared.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
  }

  canActivate() {
    console.log(this.userService.loggedIn());
    console.log(this.sharedService.user['type'] === 'admin');
    console.log(this.sharedService.user);
    return this.sharedService.user['type'] === 'admin';
  }
}
