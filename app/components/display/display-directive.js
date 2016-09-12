'use strict';

module.exports = function(app) {
  app.component('evDisplayComponent', {
    controller: 'DisplayController',
    template: require('./display-template.html'),
  });
};
