import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ImageWallComponent } from './image-wall/image-wall.component';


const routes: Routes = [
  { path: '', component: ImageWallComponent },
  { path: ':kw', component: ImageWallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
