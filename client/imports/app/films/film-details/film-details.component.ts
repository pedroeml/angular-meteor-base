import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';
import { first, tap, switchMap } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';

import { Film } from '../../../../../imports/models/film';
import { FilmsService } from '../service/films.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent {
  public id: string;
  public film: Film;
  public isLoading: boolean;

  constructor(
    private readonly service: FilmsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.isLoading = false;
    this.loadFilm().subscribe(
      res => {
        this.film = res;
      },
      err => {
        this.isLoading = false;
        this.router.navigateByUrl('/films');
      },
    );
  }

  private loadFilm(): Observable<Film> {
    return this.route.params.pipe(
      first(),
      tap(() => { this.isLoading = true; }),
      switchMap((params: ParamMap) => {
        if (isNullOrUndefined(params['id'])) {
          return Observable.throw('No Film ID found in URL');
        } else {
          return of(params['id']);
        }
      }),
      tap(id => { this.id = id; }),
      switchMap(id => this.service.findFilm(id)),
      tap(() => { this.isLoading = false; }),
    );
  }

  public updateFilm(film: Film): void {
    this.service.updateFilm(this.id, film).subscribe(
      rows => {
        if (rows > 0) {
          this.film = { ... this.film, ... film};
        }
      });
  }
}
