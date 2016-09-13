'use strict';

module.exports = exports = (app) => {
  require('./signup-controller')(app);
  require('./signup-component')(app);
};
