import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicturesWallComponent } from './pictures-wall/pictures-wall.component';
import { SearchPicturesComponent } from './search-pictures/search-pictures.component';

import { PictureService } from './picture.service';

@NgModule({
  declarations: [
    AppComponent,
    PicturesWallComponent,
    SearchPicturesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PictureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
