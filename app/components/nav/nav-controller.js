'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', 'dataService', 'eventService', '$location', '$window', NavController]);
};

function NavController($log, userService, dataService, eventService, $location, $window) {
  let localStorageUser;
  console.log('nav controller');
  if (userService.getToken()) {

    localStorageUser = JSON.parse($window.localStorage.user);

    if (userService.getToken() !== '') {
      const userToken = userService.getToken();
      userService.setUser(localStorageUser);
      eventService.userEvents(dataService.userInfo.user.username)
      .then((ev) => {
        this.yourEvents = dataService.yourEvents = ev;
      });

      const authConfig = {
        'headers': {
          'Authorization': 'Bearer ' + userToken,
        },
      };

      eventService.allVisibleEvents(authConfig)
      .then((ev) => {
        ev.forEach((item) => {
          dataService.events.push(item);
        });
      });
    }
  } else {

    eventService.publicEvents()
    .then((ev) => {
      ev.forEach((item) => {
        dataService.events.push(item);
      });
    });
  }


  this.userInfo = dataService.userInfo;

  this.getYourEvents = function(username) {
    eventService.userEvents(username)
      .then((userEvents) => {
        this.yourEvents = dataService.yourEvents;
        $log.debug(dataService.yourEvents);
        $log.debug(this.yourEvents);
        $log.debug(userEvents);
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
        $log.debug('SignupController returnedInfo: ', returnedInfo);
        this.userLogIn(userInfo);
      }).catch((err) => {
        $log.debug('error: ', err);
      });
  };

  this.userLogOut = function() {
    userService.userLogOut();
    eventService.publicEvents()
    .then((ev) => {
      ev.forEach((item) => {
        dataService.events.push(item);
      });
    });
    $location.path('/');
  };

}
