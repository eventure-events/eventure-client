'use strict';

module.exports = exports = (app) => {
  require('./display-controller')(app);
  require('./display-directive')(app);
};
