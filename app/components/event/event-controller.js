'use strict';

module.exports = exports = (app) => {
  app.controller('EventController', ['$log', '$window', 'dataService', 'eventService', 'userService', EventController]);
};

function EventController($log, $window, dataService, eventService, userService) {
  this.events = dataService.events;

  this.createEvent = function(eventInfo) {
    $log.debug('Creating event', eventInfo);
    $log.debug('EventController.createEvent eventInfo.location: ', eventInfo.location);
    this.token = userService.getToken();
    this.config = {
      'headers': {
        'Authorization': 'Bearer ' + this.token,
      },
    };

    this.geocode(eventInfo)
    .then(eventInfo => {
      eventService.createEvent(eventInfo, this.config)
        .then((ev) => {
          this.events.push(ev);
          $window.location.href = '#/profile';
        });
    });
  };


  this.geocode = function(eventInfo) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({
        'address': eventInfo.location,
      }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          eventInfo.latLong = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(eventInfo);
        }
      });

    });
  };


  this.initAutocomplete = function() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
    new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
  };

  // do not do this if we have a data service
  // will most likely remove
  // this.allEvents = function() {
  //   eventService.allEvents()
  //     .then((all) => {
  //       this.events = all;
  //     });
  // };

  // this is not needed, search returns a promise resolving with a result, this does nothing.
  // this.searchEvent = function(ev) {
  //   eventService.searchEvent(ev);
  // };
  //
  // this.updateEvent = function(ev) {
  //   eventService.updateEvent(ev);
  // };

  // handle this on data service side, not here
  // this.deleteEvent = function(ev) {
  //   eventService.deleteEvent(ev)
  //     .then((data) => {
  //       this.events.splice(this.events.indexOf(data, 1));
  //     });
  // };
}
