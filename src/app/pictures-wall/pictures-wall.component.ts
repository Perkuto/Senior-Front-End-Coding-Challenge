import { Component, OnInit } from '@angular/core';

import { pictures } from '../pictures';


@Component({
  selector: 'app-pictures-wall',
  templateUrl: './pictures-wall.component.html',
  styleUrls: ['./pictures-wall.component.css']
})
export class PicturesWallComponent implements OnInit {
  pictures = pictures.photos.photo;
  currentPage = pictures.photos.page;
  pages = pictures.photos.pages;
  perPage = pictures.photos.perpage;
  total = pictures.photos.total;

  constructor() { }

  ngOnInit() {
  }

}
