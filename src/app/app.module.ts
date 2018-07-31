import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpService} from './shared/http/http.service';
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoComponent} from './photos/photo/photo.component';
import {PhotoService} from './photos/shared/photo.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ShareButtonModule} from '@ngx-share/button';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    PhotoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    InfiniteScrollModule,
    ShareButtonModule.forRoot()
  ],
  providers: [
    HttpService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
