'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', 'userService', NavController]);
};

function NavController($log, userService) {
  $log.log('Entering display controller');

  this.userLogIn = function(userInfo) {
    userService.userSignIn(userInfo)
      .then((token) => {
        $log.log(token);
        userService.setToken(token);
      });
  };

}
