import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Photos } from '../interfaces/photos';
import { Photo } from '../interfaces/photos';
import { PictureService } from '../services/picture.service';
import { Photo } from '../interfaces/photo';

@Component({
  selector: 'app-search-pictures',
  templateUrl: './search-pictures.component.html',
  styleUrls: ['./search-pictures.component.css']
})
export class SearchPicturesComponent implements OnInit {
  private static readonly PER_PAGE: number = 12;

  searchForm;
  lastSearch: string;
  currentPage: number;
  photos: Array<Photo>;

  constructor(
    private pictureService: PictureService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      text: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(searchText) {
    this.currentPage = 0;
    this.pictureService.searchPictures(searchText.text, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => {
        this.photos = (((data as any).photos as Photos).photo as Array<Photo>);
       });
    this.lastSearch = searchText.text;
    this.searchForm.reset();
  }

  more() {
    this.pictureService.searchPictures(this.lastSearch, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => {
       this.photos = this.photos.concat(((data as any).photos as Photos).photo as Array<Photo>);
      });
  }
}
