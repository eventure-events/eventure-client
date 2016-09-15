'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', '$anchorScroll', 'userService', 'dataService', 'eventService', '$location', '$window', NavController]);
};

function NavController($log, $anchorScroll, userService, dataService, eventService, $location, $window) {
  if (!$window.localStorage.splashPage) {
    $location.path('/about');
    $window.localStorage.setItem('splashPage', 'true');
  }
  this.userInfo = dataService.userInfo;
  this.events = dataService.events;

  if (userService.getToken()) {
    let localStorageUser = JSON.parse($window.localStorage.user);

    if (userService.getToken() !== '') {
      const userToken = userService.getToken();
      userService.setUser(localStorageUser);
      eventService.userEvents(dataService.userInfo.user.username)
      .then((ev) => {
        this.yourEvents = dataService.yourEvents = ev;
      });
    }
  this.getYourEvents = function(username) {
    eventService.userEvents(username)
      .then((userEvents) => {
        this.yourEvents = dataService.yourEvents;
        $log.debug(dataService.yourEvents);
        $log.debug(this.yourEvents);
        $log.debug(userEvents);
      });
  };

  this.deleteEvent = function(id) {
    $log.log('delete id: ', id);
    this.token = userService.getToken();
    this.config = {
      'headers': {
        'Authorization': 'Bearer ' + this.token,
      },
    };
    $log.log('Delete config: ', this.config);
    eventService.deleteEvent(id, this.config)
      .then((deletedEvent) => {
        dataService.yourEvents.forEach((item, index) => {
          if (item._id === deletedEvent._id) {
            dataService.yourEvents.splice(index, 1);
            return;
          }
        });
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

}
