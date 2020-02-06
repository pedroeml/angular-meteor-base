import { Injectable } from '@angular/core';

import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs';

import { Film } from '../../../../../imports/models/film';

@Injectable()
export class FilmsService {

  public allFilms(): Observable<Film[]> {
    return MeteorObservable.subscribe('filmList');
  }

  public findFilm(id: string): Observable<Film> {
    return MeteorObservable.subscribe('findFilm', id);
  }

  public addFilm(film: Film): void {
    Meteor.call('addFilm', film);
  }

  public deleteFilm(id: string): void {
    // TODO: implementation
  }
}
