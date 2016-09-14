'use strict';

module.exports = exports = (app) => {
  require('./map-controller')(app);
  require('./map-component')(app);
};
