import { OnInit, OnDestroy, Component } from '@angular/core';

import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscription } from 'rxjs';

import { isNullOrUndefined } from 'util';

import { Films } from '../../../../../imports/collections/films';
import { Film } from '../../../../../imports/models/film';
import { FilmsService } from '../service/films.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit, OnDestroy {
  public films: Observable<Film[]>;
  public listSubscription$: Subscription;

  constructor(private readonly service: FilmsService) { }

  ngOnInit() {
    this.listSubscription$ = MeteorObservable.subscribe('filmList').subscribe(() => {
      this.films = Films.find();
    });
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.listSubscription$)) {
      this.listSubscription$.unsubscribe();
    }
  }

  public deleteFilm(film: Film): void {
    this.service.deleteFilm(film._id).subscribe();
  }
}
