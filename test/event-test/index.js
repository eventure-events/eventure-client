'use strict';

const angular = require('angular');
require('angular-mocks');

describe('EventController testing', function(){
  beforeEach(angular.mock.module('eventureApp'));
  beforeEach(angular.mock.inject(function($rootScope, $compile){
    this.compile = $compile;
    this.scope = $rootScope.$new();
  }));

  it('should create an event', function(){
    let ev = this.compile('<data-ev-event-component></data-ev-event-component')(this.scope);
    this.scope.$digest();
    expect(ev.find('option')).toBe(3);
  });
});
