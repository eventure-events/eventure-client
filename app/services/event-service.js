'use strict';

module.exports = exports = (app) => {
  app.service('eventService', ['$http', '$log', '$q', 'dataService', eventService]);
};

function eventService($http, $log, $q, dataService) {
  $log.debug('EventService :: ');

  const service = {};

  const baseUrl = `${__API_URL__}/api/event`;

  // TODO: handle the data service's reflection of the update
  service.createEvent = function(eventData, auth) {
    return $q(function(resolve, reject) {
      $log.debug('service.createEvent creating event');
      $http.post(baseUrl, eventData, auth)
        .then((res) => {
          $log.debug('success! event created', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  service.publicEvents = function() {
    return $q(function(resolve, reject) {
      $log.debug('retrieving public events');
      $http.get(baseUrl + '/public')
        .then((res) => {
          $log.debug('success! all events retrieved: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  service.followeeEvents = function(auth) {
    return $q(function(resolve, reject) {
      $log.debug('retrieving public events');
      $http.get(baseUrl + '/followed', auth)
        .then((res) => {
          $log.debug('success! followed events retrieved: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  service.allVisibleEvents = function(auth) {
    return $q(function(resolve, reject) {
      $log.debug('retrieving public events');
      $http.get(baseUrl + '/allVisible', auth)
        .then((res) => {
          $log.debug('success! all visible events retrieved: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  service.userEvents = function(username) {
    return $q(function(resolve, reject) {
      $log.debug('Retriving user specefic events');
      $http.get(baseUrl + '/user/' + username + '/all')
        .then((res) => {
          // dataService.yourEvents = res.data;
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  service.searchEvent = function(eventId) {
    return $q(function(resolve, reject) {
      $log.debug('searching for an event');
      $http.get(baseUrl + '/' + eventId)
        .then((res) => {
          $log.debug('success! event found: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  // TODO: handle the data service's reflection of the update
  service.updateEvent = function(eventData) {
    return $q(function(resolve, reject) {
      $log.debug('updating an event');
      $http.put(baseUrl + '/' + eventData._id, eventData)
        .then((res) => {
          $log.debug('success! event updated: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  // TODO: handle the data service's reflection of the update
  service.deleteEvent = function(eventData) {
    return $q(function(resolve, reject) {
      $log.debug('deleting an event');
      $http.delete(baseUrl + '/' + eventData._id)
        .then((res) => {
          $log.debug('success! event deleted: ', res.data);
          resolve(res.data);
        }).catch((err) => {
          $log.debug(err);
          reject(err);
        });
    });
  };

  return service;

}
