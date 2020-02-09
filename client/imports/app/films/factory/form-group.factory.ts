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
    const releaseDate: string = this.datePipe.transform(this.createDate(film), 'yyyy-MM-dd');

    return this.formBuilder.group({
      titleCtrl: [title],
      directorCtrl: [director],
      producerCtrl: [producer],
      releaseDateCtrl: [releaseDate],
    });
  }

  private createDate(film: Film): Date {
    if (isNullOrUndefined(film) || isNullOrUndefined(film.releaseDate)) {
      return new Date();
    }

    const splitted: string[] = film.releaseDate.split('-');
    return new Date(+splitted[0], +splitted[1], +splitted[2]);
  }
}
