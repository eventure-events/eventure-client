'use strict';

module.exports = exports = (app) => {
  app.controller('MapController', [MapController]);
};

function MapController() {
  const mapEle = document.getElementById('map');

  const mapOptions = {
    zoom: 10,
    center: {
      lat: 44,
      lng: -78,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  this.map = new google.maps.Map(mapEle, mapOptions);
}
