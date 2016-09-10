'use strict';

module.exports = function(app) {
  require('./event')(app);
  require('./display')(app);
};
