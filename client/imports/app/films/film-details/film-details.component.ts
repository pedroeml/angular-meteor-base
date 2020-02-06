import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { first, tap, map, switchMap } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';

import { Film } from '../../../../../imports/models/film';
import { FilmsService } from '../service/films.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent {
  private id: string;
  public film: Film;
  public isLoading: boolean;

  constructor(
    private readonly service: FilmsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.isLoading = false;
    this.loadFilm().subscribe();
  }

  private loadFilm(): Observable<Film> {
    return this.route.params.pipe(
      first(),
      tap(() => { this.isLoading = true; }),
      map((params: ParamMap) => !isNullOrUndefined(params['id']) ? params['id'] : ''),
      tap(id => { this.id = id; }),
      switchMap(id => this.service.findFilm(id)),
      tap(() => { this.isLoading = false; }),
      tap(film => { 
        if (isNullOrUndefined(film)) {
          this.router.navigateByUrl('/films');
        }
      }),
    );
  }

  public updateFilm(film: Film): void {
    // TODO: implementation
  }
}
