'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$rootScope', '$window', 'eventService', 'dataService', 'userService', ListController]);
};

function ListController($rootScope, $window, eventService, dataService, userService) {
  this.events = [];
  this.alphabet = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  this.localStorageUser;
  console.log('nav controller');
  if (userService.getToken()) {

    this.localStorageUser = JSON.parse($window.localStorage.user);
    console.log('this.localStorageUser: ', this.localStorageUser);
  }
  this.followUser = function(username) {
    userService.followUser(username)
      .then((followed) => {
        dataService.userInfo.user.following.push(followed);
        console.log(this.localStorageUser);
        this.localStorageUser.following.push(username);
        $window.localStorage.user = JSON.stringify(this.localStorageUser);
      });
  };

  this.addComment = function(eventId, comment) {

    const auth = {
      'headers': {
        'Authorization': 'Bearer ' + userService.getToken(),
      },
    };

    eventService.addComment(eventId, comment, auth)
      .then(comment => {
        dataService.events.forEach((item) => {
          if (item._id === eventId) {
            item.comments.push(comment);
            return;
          }
        });
      });
  };

  $rootScope.$on('viewportEvents', () => {
    if (this.events) {
      this.events = dataService.viewportEvents;
    }
    $rootScope.$digest();
  });

}
