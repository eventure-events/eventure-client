'use strict';

module.exports = exports = (app) => {
  require('./event-directive')(app);
  require('./event-controller')(app);
};
