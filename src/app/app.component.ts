import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // URL for shareable buttons. Need to override default behavior to refresh the URL correctly.
  url: string;

  // Keyword typed in the input and available in the url (http://xxx/#/<keyword>)
  keyword: string;

  constructor(private router: Router, private location: Location) {
    this.url = router.url;
    // Listen to URL modifications, and update the input if modified
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x) => this.updateKeyword());
  }

  ngOnInit () {
    this.updateKeyword();
  }

  /**
   * Update URL and shareable buttons when input is updated.
   * @param {string} keyword The keyword typed in the input.
   */
  onKeywordChange (keyword: string) {
    if (keyword) {
      this.location.go('/' + encodeURIComponent(keyword));
    }
    this.url = this.location.prepareExternalUrl(encodeURIComponent(keyword));
  }

  /**
   * Update the keyword in the input when the URL is updated.
   */
  updateKeyword () {
    if (this.router.url) {
      if (this.router.url.startsWith('/')) {
        this.keyword = decodeURIComponent(this.router.url.substr(1));
      } else {
        this.keyword = decodeURIComponent(this.router.url);
      }
    }
    this.url = this.router.url;
  }
}
