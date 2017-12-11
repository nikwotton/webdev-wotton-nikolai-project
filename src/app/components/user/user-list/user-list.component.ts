import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ImageService} from '../../../services/image.service.client';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userId: string;
  users: any;

  constructor(private userService: UserService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  }
}
