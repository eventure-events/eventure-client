'use strict';

module.exports = exports = (app) => {
  app.controller('MapController', ['$log', '$window', 'dataService', 'eventService', 'userService', 'mapService', MapController]);
};

function MapController($log, $window, dataService, eventService, userService, mapService) {
  this.events = dataService.events;

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
        dataService.events.splice(0, dataService.events.length);
        ev.forEach((item) => {
          dataService.events.push(item);
        });
        mapService.createMap();
      });
    }
  } else {

    eventService.publicEvents()
    .then((ev) => {
      dataService.events.splice(0, dataService.events.length);
      ev.forEach((item) => {
        dataService.events.push(item);
      });
      mapService.createMap();
    });
  }

}
