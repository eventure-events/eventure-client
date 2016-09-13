'use strict';

module.exports = exports = (app) => {
  app.controller('SignupController', ['$log', 'userService', SignupController])

  function SignupController($log, userService) {
    $log.log('entering signup controller');

    this.currentUser;
    this.isLoggedIn;

    this.userSignup = function(userInfo){
      userService.userSignup(userInfo)
      .then((userInfo)=>{
        $log.log(userInfo);
        userService.userSignin(userInfo);
      });
    };

  }

};
