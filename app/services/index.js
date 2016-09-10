'use strict';

module.exports = function(app) {
  require('./data-service')(app);
  require('./event-request-service')(app);
};
