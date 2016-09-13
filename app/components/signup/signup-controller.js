'use strict';

module.exports = exports = (app) => {
  app.controller('SignupController', ['$log', 'userService', '$scope', '$location', SignupController]);

  function SignupController($log, userService, $scope, $location) {
    $log.log('entering signup controller');

    this.currentUser;

    this.userSignUp = function(userInfo) {
      userService.userSignUp(userInfo)
        .then((returnedInfo) => {
          $log.log('SignupController returnedInfo: ', returnedInfo);
          userService.userSignIn(userInfo);
          $scope.isLoggedIn = true;
        }).catch((err) => {
          $log.log('error: ', err);
        });
      $location.path('/profile');
    };

  }
};
