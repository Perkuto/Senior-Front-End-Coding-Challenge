import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from '@components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  // {
  //   path: 'search',
  //   component: SearchComponent,
  // },
  {
    path: ':id',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // , { enableTracing: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
