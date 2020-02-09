import { Meteor } from 'meteor/meteor';

import { Films } from '../../../imports/collections/films';

Meteor.publish('filmList', () => {
  return Films.find({});
});
