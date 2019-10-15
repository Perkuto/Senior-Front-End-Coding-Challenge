import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPicturesComponent } from './search-pictures/search-pictures.component';


const routes: Routes = [
    {path: '', component: SearchPicturesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
