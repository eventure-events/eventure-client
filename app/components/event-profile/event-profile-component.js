'use strict';

module.exports = exports = (app) =>{
  app.component('evEventProfileComponent', {
    controller: 'EventProfileController',
    template: require('./event-profile-template.html'),
  });
};
