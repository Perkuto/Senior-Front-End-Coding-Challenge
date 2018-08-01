import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Photo} from '../shared/photo';
import {PhotoService} from '../shared/photo.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

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

  inputValue = new Subject();

  photos: Photo[];

  page: number;

  constructor(private photoService: PhotoService) {
    this.page = 1;
    // Load photos only if keyword is not modified during debounceTime ms.
    this.inputValue.pipe(debounceTime(400)).subscribe(x => {
      this.page = 1;
      this.loadPhotos();
    });
  }

  /**
   * Called when @Input is modified
   */
  ngOnChanges() {
    this.inputValue.next(this.keyword);
  }

  ngOnInit() {
  }

  /**
   * Called by infiniteScroll directive
   */
  onScroll() {
    this.page ++;
    this.loadPhotos();
  }

  private loadPhotos () {
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
