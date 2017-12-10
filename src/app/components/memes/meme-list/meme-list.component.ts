import {Component, OnInit} from '@angular/core';
import {MemeService} from '../../../services/meme.service.client';
import {ImageService} from '../../../services/image.service.client';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {

  userId: string;
  memes: any;
  memeUrls = {};

  constructor(private memeService: MemeService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.memeService.findAllMemes().subscribe((memes: any) => {
      this.memes = memes;
      this.memes.forEach(meme => {
          this.imageService.findImageById(meme.image).subscribe(image => {
            this.memeUrls[meme._id] = this.memeService.getMemeUrl(image.imageUrl, meme.topText, meme.bottomText);
          });
        }
      );
    });
  }

  getMeme(meme: any) {
    return this.memeUrls[meme._id];
  }
}
