'use strict';

module.exports = exports = (app)=>{
  app.directive('eeDisplayDirective', function(){
    return {
      restrict: 'EAC',
      template: require('./display-template.html'),
      controller: 'DisplayController',
      controllerAs: 'displayCtrl',
    };
  });
};
