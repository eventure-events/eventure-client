'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$scope', '$log', '$window', 'dataService', 'eventService', 'userService', ListController]);
};

function ListController($scope, $log, $window, dataService, eventService, userService) {
  this.events = dataService.events;

  this.followUser = function(username) {
    userService.followUser(username)
    .then(followed => dataService.userInfo.user.following.push(followed));
  };

  this.getEvents = function(){
    this.events = dataService.viewportEvents;
  };
  $scope.$on('viewportEvents', function(event, data) {
    console.log('ListController event: ', event);
    console.log('ListController data: ', data);
    // this.events = data;
  });
  // $scope.$watch(dataService.viewportEvents, function(newValue){
  //   this.events = newValue;
  // });


  //   eventService.allEvents()
  //   .then(() => {
  //     this.events = dataService.events;
  //     this.listEvents = function() {
  //       $log.debug('this.events: ', this.events);
  //     };
  //
  //     let limitStep = 4;
  //     this.limit = limitStep;
  //
  //     this.incrementLimit = function() {
  //       this.limit += limitStep;
  //     };
  //
  //     this.decrementLimit = function() {
  //       this.limit -= limitStep;
  //     };
  //
  //   });
}
