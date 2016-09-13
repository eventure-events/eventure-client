'use strict';

module.exports = exports = (app) => {
  app.component('listComponent', {
    controller: 'ListController',
    template: require('./list-template.html'),
  });
};
