import { MongoObservable } from 'meteor-rxjs';

import { Film } from '../models/film';

export const Films = new MongoObservable.Collection<Film>('films');
