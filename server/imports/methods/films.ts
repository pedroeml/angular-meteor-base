import { Meteor } from 'meteor/meteor';

import { Films } from '../../../imports/collections/films';
import { Film } from '../../../imports/models/film';

Meteor.methods({
  addFilm(film: Film): void {
    Films.insert(film);
  },
  removeFilm(id: string): void {
    Films.remove({
      _id: id,
    });
  }
});
