'use strict';
/*global angular angular:true*/
/*eslint no-undef: "error"*/

const angular = require('angular');
require('angular-mocks');


describe('testing sign-up directive', function() {
  beforeEach(angular.mock.module('eventureApp'));
  beforeEach(angular.mock.inject(function($rootScope, $compile) {
    this.compile = $compile;
    this.scope = $rootScope.$new();
  }));

  it('should sign up a new user', function() {
    
  });
});
