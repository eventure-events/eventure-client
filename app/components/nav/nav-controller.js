'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', NavController]);
};

function NavController($log, userService, dataService) {
  $log.log('Entering display controller');

  this.user = dataService.user;

  this.isLoggedin;

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((userInfo) => {
        $log.log(userInfo);
        this.isLoggedIn = true;
        userService.setToken(userInfo.token.token);
        userService.setUser(userInfo.user);
      });
  };

  this.userLogOut = function() {
    userService.userLogOut();
    this.isLoggedIn = false;
  };

}
