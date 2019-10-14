import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PictureService } from '../picture.service';

@Component({
  selector: 'app-search-pictures',
  templateUrl: './search-pictures.component.html',
  styleUrls: ['./search-pictures.component.css']
})
export class SearchPicturesComponent implements OnInit {
  searchForm;

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
    // Send search text string to flickr API
    console.warn('Search has been submitted', searchText);
    this.searchForm.reset();
  }

}
