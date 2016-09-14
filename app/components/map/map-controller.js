'use strict';

module.exports = exports = (app) => {
  app.controller('MapController', ['$log', 'dataService', 'eventService', MapController]);
};

function MapController($log, dataService, eventService) {
  // eventService.allEvents()
  //   .then((all) => {
  this.events = dataService.events;
      // dataService.events = all;
  $log.debug('dataService: ', dataService);
  $log.debug('dataService.events: ', this.events);
  const mapEle = document.getElementById('map');
  const center = {
    lat: 47.6205379,
    lng: -122.3491348,
  };
  const mapOptions = {
    zoom: 14,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  let map = new google.maps.Map(mapEle, mapOptions);
  let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let labelIndex = 0;
  let you = require('../../resources/you.png');


  this.events.forEach(function(item) {
    let marker = new google.maps.Marker({
      position: item.latLong,
      label: labels[labelIndex % labels.length],
      map: map,
    });
    let infoWindow = new google.maps.InfoWindow({
      content: '<a href="#/event/' + item._id + '">' + labels[labelIndex++ % labels.length] + '.  ' + item.name + '</a><br/>' + item.location + '<br/>' + item.description,
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  });

  let handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      let yourlocationMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: you,
        title:'your location',
      });

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}
