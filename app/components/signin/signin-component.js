'use strict';

module.exports = exports = (app) => {
  app.component('evSigninComponent', {
    template: require('./signin-template.html'),
    controller: 'NavController',
  });
};
