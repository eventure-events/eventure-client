'use strict';

module.exports = exports = (app) => {
  app.service('eventService', ['$http', '$log', '$q', 'dataService', eventService]);
};

function eventService($http, $log, $q, dataService) {
  $log.log('EventService :: ');

  const service = {};

  const baseUrl = `${__API_URL__}/api/event`;

  // TODO: handle the data service's reflection of the update
  service.createEvent = function(eventData, auth) {
    return $q(function(resolve, reject) {
      $log.log('service.createEvent creating event');
      $http.post(baseUrl, eventData, auth)
        .then((res) => {
          $log.log('success! event created', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  service.allEvents = function() {
    return $q(function(resolve, reject) {
      $log.log('retrieving all events');
      $http.get(baseUrl)
        .then((res) => {
          $log.log('success! all events retrieved: ', res.data);
          dataService.events = res.data;
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  service.searchEvent = function(eventId) {
    return $q(function(resolve, reject) {
      $log.log('searching for an event');
      $http.get(baseUrl + '/' + eventId)
        .then((res) => {
          $log.log('success! event found: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  // TODO: handle the data service's reflection of the update
  service.updateEvent = function(eventData) {
    return $q(function(resolve, reject) {
      $log.log('updating an event');
      $http.put(baseUrl + '/' + eventData._id, eventData)
        .then((res) => {
          $log.log('success! event updated: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  // TODO: handle the data service's reflection of the update
  service.deleteEvent = function(eventData) {
    return $q(function(resolve, reject) {
      $log.log('deleting an event');
      $http.delete(baseUrl + '/' + eventData._id)
        .then((res) => {
          $log.log('success! event deleted: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.log(err);
          reject(err);
        });
    });
  };

  return service;

}
