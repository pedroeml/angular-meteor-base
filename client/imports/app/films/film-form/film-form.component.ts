import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap, map, switchMap } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';

import { Film } from '../../../../../imports/models/film';
import { FilmFormControlsEnum } from '../enum/film-form-controls.enum';
import { FilmFactory } from '../factory/film.factory';
import { FormGroupFactory } from '../factory/form-group.factory';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.scss'],
})
export class FilmFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private readonly unsubscribe$: Subject<void>;

  @Input()
  public film: Film;

  @Output()
  public readonly changed: EventEmitter<Film>;

  constructor(
    private readonly formFactory: FormGroupFactory,
    private readonly filmFactory: FilmFactory) {
    this.changed = new EventEmitter<Film>();
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit() {
    this.form = this.formFactory.create(this.film);

    if (isNullOrUndefined(this.film.releaseDate)) {
      this.observeFormFields();
      this.formDate = this.formDate;
    } else {
      this.formDate = this.film.releaseDate;
      this.observeFormFields();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get formDate(): string {
    return this.form.controls[FilmFormControlsEnum.RELEASE_DATE_CTRL].value;
  }

  set formDate(date: string) {
    if (!isNullOrUndefined(date) && date.length > 0) {
      this.form.controls[FilmFormControlsEnum.RELEASE_DATE_CTRL].setValue(date);
    }
  }

  private observeFormFields(): void {
    this.observeChange(FilmFormControlsEnum.TITLE_CTRL).subscribe();
    this.observeChange(FilmFormControlsEnum.DIRECTOR_CTRL).subscribe();
    this.observeChange(FilmFormControlsEnum.PRODUCER_CTRL).subscribe();
    this.observeChange(FilmFormControlsEnum.RELEASE_DATE_CTRL).subscribe();
  } 

  private observeChange(ctrlName: FilmFormControlsEnum): Observable<void> {
    return this.form.controls[ctrlName].valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(750),
      distinctUntilChanged(),
      map(fieldValue => this.filmFactory.create(ctrlName, fieldValue)),
      switchMap(film => this.emitChange(film)),
    );
  }

  private emitChange(film: Film): Observable<void> {
    return of(film).pipe(
      tap(editedFilm => {
        this.changed.emit(editedFilm);
      }),
      map(() => undefined),
    );
  }
}
