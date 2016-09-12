'use strict';

module.exports = (app) => {
  app.factory('userService', ['$http', '$log', '$q', '$window', 'dataService', userService]);
};

function userService($http, $log, $q, $window, dataService) {
  $log.log('User service...');

  const service = {};

  const baseUrl = `${__API_URL__}/api/`;

  service.userSignIn = function(userData) {
    return $q(function(resolve, reject) {
      $log.log('Signing user in ', userData);
      $http.get(baseUrl + 'signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(userData.username + ':' + userData.password),
        },
      })
        .then((res) => {
          $log.log(res.data);
          // dataService.user = res.data;
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  service.setToken = function(token) {
    $window.localStorage.token = token;
  };

  return service;

}
