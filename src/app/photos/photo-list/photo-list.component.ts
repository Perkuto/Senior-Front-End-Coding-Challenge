import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Photo} from '../shared/photo';
import {PhotoService} from '../shared/photo.service';
import {Location} from '@angular/common';

/**
 * Component for photos list.
 */
@Component({
  selector: 'app-photo-list',
  styleUrls: ['./photo-list.component.scss'],
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit, OnChanges {
  @Input() keyword: string;

  photos: Photo[];

  page: number;

  constructor(private photoService: PhotoService, private location: Location) {
    this.page = 1;
  }

  ngOnChanges() {
    this.page = 1;
    this.loadPhotos();
  }

  ngOnInit() {
  }

  onScroll() {
    this.page ++;
    this.loadPhotos();
  }

  private loadPhotos () {
    if (this.keyword) {
      this.location.go('/' + encodeURIComponent(this.keyword));
    }
    this.photoService.getPhotos(this.keyword, this.page).subscribe(
      data => {
        if (data && data.photos) {
          if (this.page > 1) {
            Array.prototype.push.apply(this.photos, data.photos.photo);
          } else {
            this.photos = data.photos.photo;
          }
        }
      },
      error => console.log(error)
      );
  }

}
