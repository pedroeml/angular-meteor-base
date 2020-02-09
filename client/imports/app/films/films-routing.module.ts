import { FilmAddComponent } from './film-add/film-add.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmListComponent } from './film-list/film-list.component';

const routes: Routes = [{
  path: '',
  component: FilmListComponent,
}, {
  path: 'add',
  component: FilmAddComponent,
}, {
  path: ':id',
  component: FilmDetailsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
