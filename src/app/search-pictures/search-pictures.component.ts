import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Photos } from '../interfaces/photos';
import { PictureService } from '../services/picture.service';
import { Photo } from '../interfaces/photo';

@Component({
  selector: 'app-search-pictures',
  templateUrl: './search-pictures.component.html',
  styleUrls: ['./search-pictures.component.css']
})
export class SearchPicturesComponent implements OnInit {
  private static readonly PER_PAGE: number = 30;

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
    this.lastSearch = '';
  }

  ngOnInit() {
  }

  onSubmit(searchText) {
    this.currentPage = 0;
    this.lastSearch =  searchText.text;
    if (this.lastSearch.trim().length === 0) {
      return;
    }
    this.pictureService.searchPictures(this.lastSearch, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => {
        this.photos = (((data as any).photos as Photos).photo as Array<Photo>);
       });
    this.searchForm.reset();
  }

  more() {
    this.pictureService.searchPictures(this.lastSearch, 6, ++this.currentPage)
      .subscribe((data: Photos) => {
       this.photos = this.photos.concat(((data as any).photos as Photos).photo as Array<Photo>);
      });
  }
}
