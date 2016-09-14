// Lazy loading of Google Map API

module.exports = exports = (app) => {
  app.service('dataService', ['$window', '$q', googleMapApiLoadingService]);
};


function googleMapApiLoadingService($window, $q) {

  var deferred = $q.defer();

  // Load Google map API script
  function loadScript() {
    // Use global document since Angular's $document is weak
    var script = document.createElement('script');
    script.src = '//maps.googleapis.com/maps/api/js?sensor=false&language=en&callback=initMap';

    document.body.appendChild(script);
  }

  // Script loaded callback, send resolve
  $window.initMap = function () {
    deferred.resolve();
  };

  loadScript();

  return deferred.promise;
}
