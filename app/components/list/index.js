'use strict';

module.exports = exports = (app) => {
  require('./list-controller')(app);
  require('./list-component')(app);
};
