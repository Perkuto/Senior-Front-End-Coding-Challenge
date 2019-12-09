import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-wall',
  templateUrl: './image-wall.component.html',
  styleUrls: ['./image-wall.component.css']
})
export class ImageWallComponent implements OnInit, OnDestroy {
  images: any[];
  keyword: string;
  keywordSubject: Subject<string>;
  subscription: Subscription;
  constructor(
    private flickrService: FlickrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.images = [];
    this.keywordSubject = new Subject();
  }

  ngOnInit() {
    const urlKeyword = this.activatedRoute.snapshot.paramMap.get('kw');
    if (urlKeyword && urlKeyword.length > 0) {
      this.keyword = urlKeyword;
      this.search();
    }

    this.subscription = this.keywordSubject.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(() => {
        this.router.navigateByUrl(this.keyword);
        this.search();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search() {
    this.keyword = this.keyword.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword).pipe(take(1)).toPromise().then(res => {
        this.images = res;
      });
    }
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword).pipe(take(1)).toPromise().then(res => {
        this.images = this.images.concat(res);
      });
    }
  }

}
