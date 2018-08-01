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
import {RouterModule} from '@angular/router';
import {RootComponent} from './root.component';
import {APP_BASE_HREF} from '@angular/common';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    PhotoListComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    InfiniteScrollModule,
    RouterModule.forRoot(
      [{path: '**', component: AppComponent}],
      { useHash: true }
      ),
    ShareButtonModule.forRoot()
  ],
  providers: [
    HttpService,
    PhotoService,
    {provide: APP_BASE_HREF, useValue: environment.targetUrl}
],
  bootstrap: [RootComponent]
})
export class AppModule { }
