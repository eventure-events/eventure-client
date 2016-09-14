'use strict';

module.exports = exports = (app) => {
  app.component('evSignupComponent', {
    template: require('./signup-template.html'),
    controller: 'NavController',
  });
};
