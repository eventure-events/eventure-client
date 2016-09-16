'use strict';
/*global angular angular:true*/
/*eslint no-undef: "error"*/

const angular = require('angular');
require('angular-mocks');


describe('testing nav directive', function() {
  beforeEach(angular.mock.module('eventureApp'));
  beforeEach(angular.mock.inject(function($rootScope, $compile) {
    this.compile = $compile;
    this.scope = $rootScope.$new();
  }));

  it('nav component', function() {
    let nav = this.compile('<data-ev-nav-component></data-ev-nav-component>')(this.scope);
    this.scope.$digest();
    expect(nav.find('button').length).toBe(1);
  });
});
