import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {ImageService} from '../../../services/image.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  userId: string;
  users: any;
  images: any;
  disableUrl = false;
  newValue: string;
  errorFlag: boolean;
  errorMsg = 'You have an error';

  constructor(private userService: UserService, private router: Router, private imageService: ImageService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.userService.findAllUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.imageService.findAllImages().subscribe((data: any) => {
      this.images = data;
    });
    let t = '';
    if (this.sharedService.user['type'] === 'student') {
      t = 'teacher';
    } else if (this.sharedService.user['type'] === 'teacher') {
      t = 'student';
    } else if (this.sharedService.user['type'] === 'admin') {
      this.userService.findAllUsers().subscribe((data: any) => {
        this.users = data;
      });
      return;
    }
    this.userService.findUsersByType(t).subscribe((data: any) => {
      this.users = data;
    });
  }

  submit() {
    if (this.users.filter(u => u._id === this.form.value.url)[0] === undefined) {
      this.errorFlag = true;
      this.errorMsg = 'Please choose a user';
      return;
    } else {
      this.errorFlag = false;
      this.errorMsg = 'You have an error';
    }
    const url = this.form.value.new;
    if (!this.disableUrl && url === undefined) {
      this.errorFlag = true;
      this.errorMsg = 'Please enter a url leading to an image of this person';
      return;
    } else {
      this.errorFlag = false;
      this.errorMsg = 'You have an error';
    }
    const user = this.users.filter(u => u._id === this.form.value.url)[0];
    const top = this.form.value.top;
    const bottom = this.form.value.bottom;
    const description = this.form.value.description;
    if (!this.disableUrl) {
      const image = {imageUrl: url, subject: user._id};
      this.imageService.createImage(image).subscribe(data => {
        // const user = {
        //   'topText': top, 'bottomText': bottom, 'description': description,
        //   image: data._id, poster: this.sharedService.user['_id']
        // };
        this.userService.createUser(user).subscribe(() => {
        });
      });
    } else {
      // const imageId = this.images.filter(i => i.subject === user._id)[0];
      // const user = {
      //   'topText': top, 'bottomText': bottom, 'description': description,
      //   image: imageId, poster: this.sharedService.user['_id']
      // };
      this.userService.createUser(user).subscribe(() => {
      });
    }
    return this.router.navigate(['/users']);
  }

  personSelected() {
    const user = this.users.filter(u => u._id === this.form.value.url)[0];
    const url = this.images.filter(i => i.subject === user._id)[0];
    if (url !== undefined) {
      this.newValue = url.imageUrl;
      this.disableUrl = true;
    } else {
      this.newValue = '';
      this.disableUrl = false;
    }
  }
}
