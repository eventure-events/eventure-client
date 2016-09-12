'use strict';

module.exports = exports = (app) => {
  require('./nav-controller')(app);
  require('./nav-directive')(app);
};
