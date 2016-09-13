'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', '$scope', '$location', NavController]);
};

function NavController($log, userService, dataService, $scope, $location) {

  $scope.isLoggedin;

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((userInfo) => {
        $log.log('NavController.userLogIn userInfo: ', userInfo);
        $scope.isLoggedIn = true;
        userService.setToken(userInfo.token.token);
        userService.setUser(userInfo.user);
        this.currentUser = dataService.user;
      });
    $location.path('/profile');
  };

  this.userLogOut = function() {
    userService.userLogOut();
    $scope.isLoggedIn = false;
    $location.path('/');
  };

}
