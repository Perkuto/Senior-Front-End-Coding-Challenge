import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  url: string;

  keyword: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x) => this.updateKeyword());
  }

  ngOnInit () {
    this.updateKeyword();
  }

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
