'use strict';

module.exports = function(app) {
  app.component('evNavComponent', {
    controller: 'NavController',
    template: require('./nav-template.html'),
  });
};
