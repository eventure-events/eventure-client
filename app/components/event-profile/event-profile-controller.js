'use strict';

module.exports = exports = (app) => {
  app.controller('EventProfileController', ['$log', 'dataService', 'eventService', '$routeParams', EventProfileController]);
};

function EventProfileController($log, dataService, eventService, $routeParams) {
  let whatEvent = [];
  dataService.events.forEach(function(thing){
    if(thing._id === $routeParams.id) whatEvent.push(thing);
  });
  this.currentEvent = whatEvent[0];


}
