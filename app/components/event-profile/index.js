'use strict';

module.exports = exports = (app) => {
  require('./event-profile-controller')(app);
  require('./event-profile-component')(app);
};
