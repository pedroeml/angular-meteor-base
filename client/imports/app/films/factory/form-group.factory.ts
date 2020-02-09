import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { isNullOrUndefined } from 'util';

import { Film } from '../../../../../imports/models/film';

@Injectable()
export class FormGroupFactory {

  constructor(
    private readonly datePipe: DatePipe,
    private readonly formBuilder: FormBuilder) { }

  public create(film: Film): FormGroup {
    const title: string = !isNullOrUndefined(film) && !isNullOrUndefined(film.title) ? film.title : '';
    const director: string = !isNullOrUndefined(film) && !isNullOrUndefined(film.director) ? film.director : '';
    const producer: string = !isNullOrUndefined(film) && !isNullOrUndefined(film.producer) ? film.producer : '';
    const releaseDate: string = this.datePipe.transform(!isNullOrUndefined(film) && !isNullOrUndefined(film.releaseDate) ? new Date(film.releaseDate) : new Date(), 'yyyy-MM-dd');
    return this.formBuilder.group({
      titleCtrl: [title],
      directorCtrl: [director],
      producerCtrl: [producer],
      releaseDateCtrl: [releaseDate],
    });
  }
}
