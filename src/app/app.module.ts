import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicturesWallComponent } from './pictures-wall/pictures-wall.component';
import { SearchPicturesComponent } from './search-pictures/search-pictures.component';

import { PictureService } from './services/picture.service';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    PicturesWallComponent,
    SearchPicturesComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PictureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
