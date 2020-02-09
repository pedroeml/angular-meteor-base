import { Component } from '@angular/core';

import { isNullOrUndefined } from 'util';

import { Film } from '../../../../../imports/models/film';
import { FilmsService } from '../service/films.service';

@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.scss'],
})
export class FilmAddComponent {
  public film: Film;

  constructor(private readonly service: FilmsService) {
    this.film = { };
  }

  private addFilm(film: Film): void {
    this.service.addFilm(film).subscribe(
      id => {
        this.film._id = id;
      });
  }

  public updateFilm(film: Film): void {
    if (isNullOrUndefined(this.film._id)) {
      this.addFilm(film);
    } else {
      this.service.updateFilm(this.film._id, film).subscribe(
        rows => {
          if (rows > 0) {
            this.film = { ... this.film, ... film};
          }
        });
    }
  }
}
