import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {Location, LocationStrategy,PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { ImageScrollComponent } from './imagescroll/imagescroll.component';
import { SearchBarComponent } from './search/searchbar';
import { ImageService } from './service/imagesearch.service';
import { InfiniteScrollDirective} from './directives/infinitescroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollDirective,
    SearchBarComponent,
    ImageScrollComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
      HttpClientModule, 
      Location, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }