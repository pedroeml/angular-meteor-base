import { FormGroupFactory } from './factory/form-group.factory';
import { FilmFactory } from './factory/film.factory';
import { FilmAddComponent } from './film-add/film-add.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmsService } from './service/films.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilmsRoutingModule,
  ],
  declarations: [
    FilmListComponent,
    FilmDetailsComponent,
    FilmAddComponent,
    FilmFormComponent,
  ],
  providers: [
    DatePipe,
    FilmsService,
    FilmFactory,
    FormGroupFactory,
  ],
})
export class FilmsModule { }
