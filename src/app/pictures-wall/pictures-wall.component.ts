import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Photo } from '../interfaces/photo';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pictures-wall',
  templateUrl: './pictures-wall.component.html',
  styleUrls: ['./pictures-wall.component.css']
})
export class PicturesWallComponent implements OnInit {
  @Input() photos: Array<Photo>;

  constructor(
    private pictureService: PictureService
  ) {}

  ngOnInit() {
  }

}
