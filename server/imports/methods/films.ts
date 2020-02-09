import { Meteor } from 'meteor/meteor';

import { Films } from '../../../imports/collections/films';
import { Film } from '../../../imports/models/film';

Meteor.methods({
  findFilm(id: string): Film {
    return Films.collection.findOne({ _id: id });
  },
  addFilm(film: Film): string {
    return Films.collection.insert(film);
  },
  updateFilm(id: string, film: Film): number {
    return Films.collection.update({ _id: id }, { $set: film });
  },
  removeFilm(id: string): number {
    return Films.collection.remove({ _id: id });
  }
});
