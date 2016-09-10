'use strict';

module.exports = exports = (app) => {
  app.controller('EventController', ['$http', '$q', '$log', EventController]);
};

function EventController($http, $q, $log) {
  console.log('eventcontroller');
  let baseUrl = `${__API_URL__}/api/event`;

  this.create = function(newEvent) {
    return $q(function(resolve, reject) {
      $http.post(baseUrl, newEvent)
        .then((res) => {
          $log.log('success! event created', res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
