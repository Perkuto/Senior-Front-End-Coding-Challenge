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
  private static readonly PER_PAGE: number = 11;

  private lastKeyWord: string;
  private currentPage: number;
  photos: Array<Photo>;
  searchForm;

  constructor(
    private pictureService: PictureService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      text: ''
    });
    this.lastKeyWord = '';
  }

  ngOnInit() {
  }

  onSubmit(searchText) {
    const keyword: string = searchText.text as string;
    if (keyword  === null) {
      return;
    } else {
      this.currentPage = 0;
      this.loadPhotos(keyword.trim());
      this.searchForm.reset();
    }
  }

  private loadPhotos(keyword: string) {
    this.lastKeyWord =  keyword;
    this.pictureService.searchPictures(this.lastKeyWord, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => {
        this.photos = (((data as any).photos as Photos).photo as Array<Photo>);
       });
  }

  loadMorePhotos() {
    this.pictureService.searchPictures(this.lastKeyWord, SearchPicturesComponent.PER_PAGE, ++this.currentPage)
      .subscribe((data: Photos) => {
       this.photos = this.photos.concat(((data as any).photos as Photos).photo as Array<Photo>);
      });
  }
}
