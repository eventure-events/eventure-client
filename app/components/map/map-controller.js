'use strict';

module.exports = exports = (app) => {
  app.controller('MapController', ['$log', 'dataService', 'eventService', MapController]);
};

function MapController($log, dataService, eventService) {
  eventService.allEvents()
    .then(() => {

      $log.log('MapController dataService.events: ', dataService.events);



      const mapEle = document.getElementById('map');
      const center = {
        lat: 44,
        lng: -120,
      };

      const mapOptions = {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      let map = this.map = new google.maps.Map(mapEle, mapOptions);

      var geocoder = new google.maps.Geocoder();
      var address = '2901 3rd Ave, Seattle, WA';

      geocoder.geocode({
        'address': address
      }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          const pin = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          var marker = new google.maps.Marker({
            position: pin,
            map: map,
          });

          let infoWindow = new google.maps.InfoWindow();
          infoWindow.setContent(address);

          marker.addListener('click', function() {
            infoWindow.open(map, marker);
          });

        }
      });


    });
}
