import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicturesWallComponent } from './pictures-wall/pictures-wall.component';


const routes: Routes = [
    {path: '', component: PicturesWallComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
