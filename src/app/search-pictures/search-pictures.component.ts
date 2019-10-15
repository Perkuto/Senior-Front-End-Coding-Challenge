import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Photos } from '../interfaces/photos';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-search-pictures',
  templateUrl: './search-pictures.component.html',
  styleUrls: ['./search-pictures.component.css']
})
export class SearchPicturesComponent implements OnInit {
  searchForm;
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

  onSubmit(searchText: string) {
    console.warn('Request submitted', searchText);
    this.pictureService.searchPictures(searchText)
      .subscribe((data: Photos) => this.photos = { ...(data as any).photos });
    this.searchForm.reset();
  }

}
