'use strict';

module.exports = function(app) {
  app.component('evProfileComponent', {
    controller: 'NavController',
    template: require('./profile-template.html'),
  });
};
