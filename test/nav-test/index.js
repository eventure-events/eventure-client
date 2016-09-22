'use strict';

const angular = require('angular');
const eventureApp = angular.module('eventureApp', []);

require('../../app/components/event')(eventureApp);

describe('testing nav directive', function() {
  beforeEach(angular.mock.module('eventureApp'));
  beforeEach(angular.mock.inject(function($rootScope, $compile) {
    this.compile = $compile;
    this.scope = $rootScope.$new();
  }));

  it('nav component', function() {
    let nav = this.compile('<data-ev-nav-component></data-ev-nav-component>')(this.scope);
    this.scope.$digest();
    expect(1 + 1).toEqual(6);
    expect(nav.find('button').length).toBe(1);
  });
});
