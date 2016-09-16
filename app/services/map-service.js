'use strict';

module.exports = exports = (app) => {
  app.factory('mapService', ['$rootScope', 'dataService', mapService]);
};

function mapService($rootScope, dataService) {

  const service = {};
  service.map;
  service.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  service.labelIndex = 0;
  dataService.viewportEvents = [];



  service.createMap = function() {
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
    service.map = new google.maps.Map(mapEle, mapOptions);

    service.handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        let marker = new google.maps.Marker({
          position: pos,
          map: service.map,
          title: 'your location',
        });
        let infoWindow = new google.maps.InfoWindow({
          content: 'This is you!',
        });
        marker.addListener('click', function() {
          infoWindow.open(service.map, marker);
        });
        service.map.setCenter(pos);
      }, function() {
        service.handleLocationError(true, service.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      service.handleLocationError(false, service.map.getCenter());
    }
    service.mapIdleListener(service.map);
  };

  service.mapIdleListener = function(map) {
    google.maps.event.addListener(map, 'idle', function() {
      service.labelIndex = 0;
      dataService.viewportEvents = [];
      dataService.events.forEach(function(item) {
        if (map.getBounds().contains(item.latLong)) {
          dataService.viewportEvents.push(item);
        }
      });
      dataService.viewportEvents.forEach(function(item) {
        let marker = new google.maps.Marker({
          position: item.latLong,
          label: service.labels[service.labelIndex % service.labels.length],
          map: map,
        });
        let infoWindow = new google.maps.InfoWindow({
          content: '<a href="#/event/' + item._id + '">' + service.labels[service.labelIndex++ % service.labels.length] + '.  ' + item.name + '</a><br/>' + item.location + '<br/>' + item.description,
        });
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      });
      $rootScope.$broadcast('viewportEvents', dataService.viewportEvents);
    });
  };

  return service;
}
