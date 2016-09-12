'use strict';

module.exports = exports = (app) => {
  app.factory('data', ['$log', data]);
};

function data($log) {
  let info = {};
  info.events = [];
  $log.log('Info from factory :: ', info.events);

  return info;
}
