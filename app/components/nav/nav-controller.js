'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', '$location', NavController]);
};

function NavController($log, userService, dataService, $location) {

  this.isLoggedIn = userService.isLoggedIn;

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((userInfo) => {
        $log.log('NavController.userLogIn userInfo: ', userInfo);
        userService.isLoggedIn = true;
        $log.log('Is logged in ', this.isLoggedIn);
        $log.log('userservice Is logged in ', userService.isLoggedIn);
        userService.setToken(userInfo.token.token);
        userService.setUser(userInfo.user);
        $location.path('/profile');
      });
  };

  this.userSignUp = function(userInfo) {
    userService.userSignUp(userInfo)
      .then((returnedInfo) => {
        $log.log('SignupController returnedInfo: ', returnedInfo);
        this.userLogIn(userInfo);
      }).catch((err) => {
        $log.log('error: ', err);
      });
  };

  this.userLogOut = function() {
    userService.userLogOut();
    userService.isLoggedIn = false;
    $location.path('/');
  };

}
