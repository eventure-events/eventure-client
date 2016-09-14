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
          $log.log('service.userSignIn res.data: ', res.data);
          $window.localStorage.user = JSON.stringify(res.data.user);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  service.userSignUp = function(userData) {
    return $q(function(resolve, reject) {
      $log.log('Signing up user ', userData);
      $log.log('$http.posting: ', baseUrl + 'signup', userData);
      $http.post(baseUrl + 'signup', userData)
        .then((res) => {
          $log.log('service.userSignUp res.data: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log('error: ', err);
          reject(err);
        });
    });
  };

  service.setToken = function(token) {
    $log.log('Setting LS ', token);
    $window.localStorage.token = token.token;
  };

  service.getToken = function() {
    return $window.localStorage.token;
  };

  service.setUser = function(user) {
    $log.log('Setting user ', user);
    dataService.userInfo.user = user;
    dataService.userInfo.isLoggedIn = true;
  };

  service.userLogOut = function() {
    dataService.userInfo.user = {};
    dataService.yourEvents = [];
    dataService.userInfo.isLoggedIn = false;
    $log.log('logging out', dataService.userInfo);
    $window.localStorage.token = '';
    $window.localStorage.user = '';
  };

  return service;
}
