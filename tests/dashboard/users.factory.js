(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: users', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.dashboard'));

    var users;

    beforeEach(inject(function($injector){

      users = $injector.get('users');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
