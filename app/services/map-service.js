'use strict';

module.exports = exports = (app) => {
  app.factory('mapService', ['$rootScope', 'dataService', mapService]);
};

function mapService($rootScope, dataService) {

  const service = {};
  service.map;
  service.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  service.labelIndex = 0;
  service.you = require('../resources/you.svg');
  dataService.viewportEvents = [];



  service.createMap = function() {
    const mapEle = document.getElementById('map');
    const center = {
      lat: 47.6205379,
      lng: -122.3491348,
    };
    const mapOptions = {
      zoom: 14,
      styles: [{
        elementType: 'geometry',
        stylers: [{
          hue: '#ff4400',
        }, {
          saturation: -68,
        }, {
          lightness: -4,
        }, {
          gamma: 0.72,
        }],
      }, {
        featureType: 'road',
        elementType: 'labels.icon',
      }, {
        featureType: 'landscape.man_made',
        elementType: 'geometry',
        stylers: [{
          hue: '#0077ff',
        }, {
          gamma: 3.1,
        }],
      }, {
        featureType: 'water',
        stylers: [{
          hue: '#0b2236',
        }, {
          gamma: .25,
        }, {
          saturation: -20,
        }],
      }, {
        featureType: 'poi.park',
        stylers: [{
          hue: '#44ff00',
        }, {
          saturation: -23,
        }],
      }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          hue: '#007fff',
        }, {
          gamma: 0.77,
        }, {
          saturation: 65,
        }, {
          lightness: 99,
        }],
      }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          gamma: 0.11,
        }, {
          weight: 5.6,
        }, {
          saturation: 99,
        }, {
          hue: '#0091ff',
        }, {
          lightness: -86,
        }],
      }, {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{
          lightness: -48,
        }, {
          hue: '#ff5e00',
        }, {
          gamma: 1.2,
        }, {
          saturation: -23,
        }],
      }, {
        featureType: 'transit',
        elementType: 'labels.text.stroke',
        stylers: [{
          saturation: -64,
        }, {
          hue: '#ff9100',
        }, {
          lightness: 16,
        }, {
          gamma: 0.47,
        }, {
          weight: 2.7,
        }],
      }],
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
