'use strict';

module.exports = exports = (app) => {
  app.component('mapComponent', {
    controller: 'MapController',
    template: require('./map-template.html'),
  });
};
