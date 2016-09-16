'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$rootScope', 'eventService', 'dataService', 'userService', ListController]);
};

function ListController($rootScope, eventService, dataService, userService) {
  this.events = [];

  this.followUser = function(username) {
    userService.followUser(username)
      .then(followed => dataService.userInfo.user.following.push(followed));
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
      this.limit = limitStep;
      this.limitReached = false;
    }
    $rootScope.$digest();
  });

  if (this.limit > this.events.length) {
    this.limitReached = true;
  }

  let limitStep = 4;
  this.limit = limitStep;

  this.incrementLimit = function() {
    this.limit += limitStep;
  };

  this.decrementLimit = function() {
    this.limit -= limitStep;
  };

}
