import { Component, OnInit } from '@angular/core';
import { FlickrPhotosService } from '../service/flickr-photos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shareable-photos-walls',
  templateUrl: './shareable-photos-walls.component.html',
  styleUrls: ['./shareable-photos-walls.component.css']
})
export class ShareablePhotosWallsComponent implements OnInit {
  keyword : string;
  photos :  any[];
  constructor(private flickrPhotosService : FlickrPhotosService, private location: Location) {
    this.flickrPhotosService.keyword$.subscribe(value => {
      this.keyword = value; 
      this.searchPhotos();
      const keywordUrl = '/' + this.keyword;
      this.location.replaceState(keywordUrl);
    })
   }

  ngOnInit() {
  }

  public searchPhotos(){
    this.keyword = this.keyword.toLowerCase();
      if (this.keyword) {
      this.flickrPhotosService.getFlickrPhotos(this.keyword).subscribe(res=> {
        this.photos = res;
      }); 
    }
  }
  onScroll() {
    if (this.keyword) {
      this.flickrPhotosService.getFlickrPhotos(this.keyword).subscribe(res => {
        this.photos = this.photos.concat(res);
      });
    }
  }

 
}
