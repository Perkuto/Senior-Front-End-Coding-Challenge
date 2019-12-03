import { FlickrService } from '@services/flickr.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, fromEvent, merge, empty, of } from 'rxjs';
import { debounceTime, map, filter, tap, distinct, mergeMap } from 'rxjs/operators';
import { flatMap as _flatMap } from 'lodash/fp';
import { Photos } from '@models/photos';
import * as _ from 'lodash';

@Component({
  selector: 'cdx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  photoHeight = 150;
  photoWidth = 150;
  photoMargin = 11; // Margin 10px and Border 1px
  toolbarMargin = 64;
  loading = false; // loading spinner state
  lastPage = 0; // 0 means not initialized
  photosResult$;

  private cache = [];
  private photosPerPage = 50;
  private photoHeightWithMargin = this.photoWidth + 2 * this.photoMargin; // for assignment purpose - self documented code
  private photoWidthWithMargin = this.photoHeight + 2 * this.photoMargin; // for assignment purpose - self documented code

  private pageToLoadManual$: BehaviorSubject<number>; // Emit page to load manually
  private pageToLoadAfterScrolling$: Observable<number>; // Emit page to load on scroll change
  private pageToLoadAfterResize$: Observable<number>; // Emit page to load after window is resized
  private pageToLoad$: Observable<number>; // merge of the 3 Observables above

  // Keyword field value, control and events subscription
  public keyword: string;
  public keywordControl = new FormControl();
  public keywordCtrlSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private flickrService: FlickrService) {
    // Get the is from router event observable
    this.router.events.pipe(filter(event => event instanceof ActivationEnd)).subscribe((data: ActivationEnd) => {
      this.keyword = data.snapshot.paramMap.get('id');
      this.initPageLoad();
    });

    // Initialize the manual page to load.
    this.pageToLoadManual$ = new BehaviorSubject(0);

    // Initialize the page to load after scrolling.
    this.pageToLoadAfterScrolling$ = fromEvent(window, 'scroll').pipe(
      // Only vertical change matters
      map(() => window.scrollY),
      // Filter out scroll value over viewport
      filter(current => current > document.body.clientHeight - window.innerHeight),
      // Wait for no change at least for 200ms
      debounceTime(200),
      // Remove duplicate value
      distinct(),
      // Calculate the page number to load based on scrolling destination
      map(yMove => {
        const photosInARow = Math.floor(window.innerWidth / this.photoWidthWithMargin);
        return Math.ceil(
          (yMove + window.innerHeight) / (this.photoHeightWithMargin * (this.photosPerPage / photosInARow))
        );
      })
    );

    this.pageToLoadAfterResize$ = fromEvent(window, 'resize').pipe(
      // Wait for no change at least for 200ms
      debounceTime(200),
      // Caculate the page number to load based on the new window size
      map(() => {
        const photosInARow = Math.floor(window.innerWidth / this.photoWidthWithMargin);
        return Math.ceil(
          (window.innerHeight + document.body.scrollTop) /
            (this.photoHeightWithMargin * (this.photosPerPage / photosInARow))
        );
      })
    );

    // Merge events emmited by the 3 above Observables
    this.pageToLoad$ = merge(this.pageToLoadManual$, this.pageToLoadAfterScrolling$, this.pageToLoadAfterResize$).pipe(
      // Remove duplicates (no need to load the same page twice)
      distinct(),
      // Check if page is already in cache
      filter(page => this.cache[page - 1] === undefined)
    );
  }

  ngOnInit() {
    // On keyword change, after at least 1s, navigate to the same page with keyword as parameter
    // No need any other form handling. Search change the route, the destination component (self) change displayed result.
    this.keywordCtrlSub = this.keywordControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(enteredValue => this.router.navigate(['/', enteredValue]));
  }

  initPageLoad() {
    // Only load values if keyword exists
    if (this.keyword) {
      // Reset the cache
      this.cache = [];
      // Set the page to load to the 1st page
      this.pageToLoadManual$.next(1);

      // Get photos to display
      this.photosResult$ = this.pageToLoad$.pipe(
        // Start the loading spinner
        tap(() => {
          this.loading = true;
        }),
        mergeMap((page: number) => {
          // Verify if we already load the last page or if 1st page was not yet loaded
          if (page <= this.lastPage || this.lastPage === 0) {
            return this.flickrService.photosSearch(this.keyword, this.photosPerPage, page).pipe(
              tap(resp => {
                // Store the last page - we don't want to go over last one and make useless requests.
                this.lastPage = resp.pages;
                this.loading = false;

                // For assignment purpose - monitoring the request to flicr
                console.log('=============================');
                console.log('Page number              :', resp.page);
                console.log('Number of pages          :', resp.pages);
                console.log('Number of items per page :', resp.perpage);
                console.log('Total items              :', resp.total);
              }),
              // Extract the photos - We don't need page metadata for UI
              map((photos: Photos) => photos.photo),
              tap(resp => {
                // Update the cache
                this.cache[page - 1] = resp;

                // Calculate the number of photos in a row
                const photosInARow = Math.floor(window.innerWidth / this.photoWidthWithMargin);

                // If the loaded page doesn't cover the viewport, let's load another page
                // Only if this page is not the last one
                if (((this.photoHeight * this.photosPerPage) / photosInARow) * page < window.innerHeight) {
                  if (page < this.lastPage) {
                    this.pageToLoadManual$.next(page + 1);
                  }
                }
              })
            );
          } else {
            // If requested page is over the last one, clean the state and return no photo without calling flickr
            this.loading = false;
            return of([]);
          }
        }),
        // Flatterns the cache
        map(() => _.flatMap(this.cache))
      );
    } else {
      // No keyword - Clean the state
      this.photosResult$ = of([]);
      this.lastPage = 0;
      this.loading = false;
    }
  }
}
