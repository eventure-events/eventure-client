'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', 'eventService', '$location', '$window', NavController]);
};

function NavController($log, userService, dataService, eventService, $location, $window) {
  let localStorageUser;
  if (userService.getToken()) {
    localStorageUser = JSON.parse($window.localStorage.user);
    if (userService.getToken() !== '') userService.setUser(localStorageUser);
    eventService.userEvents(localStorageUser.username)
    .then(() => {
      this.yourEvents = dataService.yourEvents;
      $log.log('NavController -> yourEvents: ', this.yourEvents);
    });
  }


  this.userInfo = dataService.userInfo;

  this.getYourEvents = function(username) {
    eventService.userEvents(username)
      .then((userEvents) => {
        this.yourEvents = dataService.yourEvents;
        $log.log(dataService.yourEvents);
        $log.log(this.yourEvents);
        $log.log(userEvents);
      });
  };

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((userInfo) => {
        userService.setUser(userInfo.user); // set user in data service, which in turn sets it here.
        userService.setToken(userInfo.token);
        this.getYourEvents(userInfo.user.username);
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
