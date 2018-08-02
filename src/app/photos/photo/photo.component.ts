import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../shared/photo';
import {PhotoService} from '../shared/photo.service';

/**
 * Component for photo.
 */
@Component({
  selector: 'app-photo',
  styleUrls: ['./photo.component.scss'],
  templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit {

  @Input() photo: Photo;

  photoUrl: string;

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoUrl = this.photoService.getPhotoUrl(this.photo);
  }

}
