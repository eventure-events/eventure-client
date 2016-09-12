'use strict';

module.exports = exports = (app) => {
  app.factory('eventRequest', ['$http', '$log', '$q', 'data', eventRequest]);
};

function eventRequest($http, $log, $q, data) {
  $log.log('eventRequest :: ');

  let eventRequest = {};
  let eventUrl = `${__API_URL__}/api/event`;

  eventRequest.createEvent = function(newEvent) {
    return $q(function(resolve, reject) {
      $log.log('creating event');
      $http.post(eventUrl, newEvent)
        .then((res) => {
          $log.log('success! event created', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  eventRequest.allEvents = function() {
    return $q(function(resolve, reject) {
      $log.log('retrieving all events');
      $http.get(eventUrl)
        .then((res) => {
          $log.log('success! all events retrieved: ', res.data);
          data.events = res.data;
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  eventRequest.searchEvent = function(searchEvent) {
    return $q(function(resolve, reject) {
      $log.log('searching for an event');
      $http.get(eventUrl + '/' + searchEvent._id)
        .then((res) => {
          $log.log('success! event found: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  eventRequest.updateEvent = function(updateEvent) {
    return $q(function(resolve, reject) {
      $log.log('updating an event');
      $http.put(eventUrl + '/' + updateEvent._id)
        .then((res) => {
          $log.log('success! event updated: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  eventRequest.deleteEvent = function(deleteEvent) {
    return $q(function(resolve, reject) {
      $log.log('deleting an event');
      $http.delete(eventUrl + '/' + deleteEvent._id)
        .then((res) => {
          $log.log('success! event deleted: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  return eventRequest;

}
