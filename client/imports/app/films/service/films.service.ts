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
    return MeteorObservable.call('findFilm', id);
  }

  public addFilm(film: Film): Observable<string> {
    return MeteorObservable.call('addFilm', film);
  }

  public updateFilm(id: string, film: Film): Observable<number> {
    return MeteorObservable.call('updateFilm', id, film);
  }

  public deleteFilm(id: string): Observable<number> {
    return MeteorObservable.call('removeFilm', id);
  }
}
