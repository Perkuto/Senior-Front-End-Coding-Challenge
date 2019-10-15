import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Photos } from '../interfaces/photos';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pictures-wall',
  templateUrl: './pictures-wall.component.html',
  styleUrls: ['./pictures-wall.component.css']
})
export class PicturesWallComponent implements OnInit {
  @Input() photos: Photos;

  constructor(
    private pictureService: PictureService
  ) {}

  ngOnInit() {
  }

}
