import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Photos } from '../interfaces/photos';
import { Photo } from '../interfaces/photo';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-search-pictures',
  templateUrl: './search-pictures.component.html',
  styleUrls: ['./search-pictures.component.css']
})
export class SearchPicturesComponent implements OnInit {
  private static readonly PER_PAGE: number = 6;

  searchForm;
  lastSearch: string;
  currentPage: number;
  photos: Photos;


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
    this.currentPage = 1;
    this.pictureService.searchPictures(searchText.text, SearchPicturesComponent.PER_PAGE, this.currentPage)
      .subscribe((data: Photos) => this.photos = { ...(data as any).photos });
    this.lastSearch = searchText.text;
    this.searchForm.reset();
  }

  more() {
    console.warn('value of photos', this.photos.photo);
    this.pictureService.searchPictures(this.lastSearch, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => this.photos = ({ ...((data as any).photos )}));
  }

}
