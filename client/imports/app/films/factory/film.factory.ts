import { Injectable } from '@angular/core';

import { Film } from '../../../../../imports/models/film';
import { FilmFormControlsEnum } from '../enum/film-form-controls.enum';

@Injectable()
export class FilmFactory {
  public create(ctrlName: FilmFormControlsEnum, fieldValue: string): Film {
    let film: Film;

    switch (ctrlName) {
      case FilmFormControlsEnum.TITLE_CTRL:
        film = { title: fieldValue };
        break;
      case FilmFormControlsEnum.DIRECTOR_CTRL:
        film = { director: fieldValue };
        break;
      case FilmFormControlsEnum.PRODUCER_CTRL:
        film = { producer: fieldValue };
        break;
      case FilmFormControlsEnum.RELEASE_DATE_CTRL:
        film = { releaseDate: fieldValue };
        break;
    }

    return film;
  }
}
