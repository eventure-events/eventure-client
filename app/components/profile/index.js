'use strict';

module.exports = (app) => {
  require('./profile-controller')(app);
  require('./profile-directive')(app);
};
