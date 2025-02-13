import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path: 'films',
  loadChildren: './films/films.module#FilmsModule',
}, {
  path: '',
  redirectTo: 'films',
  pathMatch: 'full',
}, {
  path: '**',
  component: PageNotFoundComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
