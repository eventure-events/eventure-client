'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', '$location', NavController]);
};

function NavController($log, userService, dataService, $location) {

  this.userInfo = dataService.userInfo;

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((userInfo) => {
        userService.setUser(userInfo.user); // ser user in data service, which in turn sets it here.
        userService.isLoggedIn = true;
        userService.setToken(userInfo.token);
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
    $location.path('/');
  };

}
