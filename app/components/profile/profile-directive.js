'use strict';

module.exports = function(app) {
  app.component('evProfileComponent', {
    controller: 'ProfileController',
    template: require('./profile-template.html'),
  });
};
