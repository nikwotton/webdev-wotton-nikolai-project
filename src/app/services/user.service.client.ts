import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';

@Injectable()

export class UserService {

  constructor(private http: Http, private router: Router, private sharedService: SharedService) {
  }

  baseUrl = environment.baseUrl;

  options = new RequestOptions();

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById,
    'findUserByUsername': this.findUserByUsername,
    'findUserByCredentials': this.findUserByCredentials,
    'findUsersByType': this.findUsersByType,
    'findAllUsers': this.findAllUsers,
    'updateUser': this.updateUser,
    'deleteUser': this.deleteUser,
    'login': this.login,
    'logout': this.logout,
    'register': this.register,
    'loggedIn': this.loggedIn
  };

  createUser(user: any) {
    return this.http.post(this.baseUrl + '/api/user', user)
      .map((res: Response) => {
        return res.json();
      });
  }

  findUserById(userId: string) {
    return this.http.get(this.baseUrl + '/api/user/' + userId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findUserByUsername(username: string) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username)
      .map((res: Response) => {
        return res.json();
      });
  }

  findUserByCredentials(username: string, password: string) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((res: Response) => {
        return res.json();
      });
  }

  findUsersByType(type: String) {
    return this.http.get(this.baseUrl + '/api/user?type=' + type)
      .map((res: Response) => {
        return res.json();
      });
  }

  findAllUsers() {
    return this.http.get(this.baseUrl + '/api/user')
      .map((res: Response) => {
        return res.json();
      });
  }

  updateUser(userId: string, user: any) {
    return this.http.put(this.baseUrl + '/api/user/' + userId, user)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseUrl + '/api/user/' + userId)
      .map((res: Response) => {
        return res.json();
      });
  }

  login(username: String, password: String) {

    this.options.withCredentials = true; // jga

    const body = {
      username: username,
      password: password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }

  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options)
      .map((res: Response) => {
        const data = res;
      });
  }

  register(username: String, password: String, type: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password,
      type: type
    };

    return this.http.post(this.baseUrl + '/api/register', user, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.get(this.baseUrl + '/api/loggedIn', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user; // setting user so as to share with all components
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
