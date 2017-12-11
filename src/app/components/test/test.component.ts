import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {TestService} from '../../services/test.service.client';
import {MemeService} from '../../services/meme.service.client';
import {ImageService} from '../../services/image.service.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  imageUrl = '';
  top = '';
  bottom = '';

  constructor(private memeService: MemeService) {
  }

  ngOnInit() {

  }

  submit() {
    this.imageUrl = this.memeService.getMemeUrl(this.form.value.url, this.form.value.topText, this.form.value.bottomText);
  }
}
