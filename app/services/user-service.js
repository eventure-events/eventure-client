'use strict';

module.exports = (app) => {
  app.factory('userService', ['$http', '$log', '$q', userService]);
};

function userService($http, $log, $q) {
  $log.log('User service...');
}
