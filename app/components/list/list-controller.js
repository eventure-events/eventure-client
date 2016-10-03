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

  //hmmm, this is dangerous. it can lead to some really hard to find bugs down the line
  //I would look at doing this a different way
  $rootScope.$on('viewportEvents', () => {
    if (this.events) {
      this.events = dataService.viewportEvents;
    }
    $rootScope.$digest();
  });

}
