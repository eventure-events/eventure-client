'use strict';

module.exports = function(app) {
  app.component('evEventComponent', {
    controller: 'EventController',
    template: require('./event-template.html'),
  });
};
