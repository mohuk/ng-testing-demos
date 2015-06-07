(function(){

  /* global module, inject */

  'use strict';

  /**
   * This is where all the testing greatness begins
   * prefixing a describe block with 'f' runs only this block and ignore all others
   * prefixing it with an 'x' omits this block altogether
   */

  describe('Factory: users', function(){

    /**
     * angular mocks decorates services to aid testing e.g.
     *
     * $controller - used for returning an instance of a controller for testing
     * $httpBackend - mock HTTP requests
     * inject - provides an easy access to dependency injection pool
     * module - loads an angular module
     * dump - dumps content on the console
     *
     * There are some other goodies, check them out in the docs
     */

     /**
      * beforeEach block runs before executing each test in the test suite
      * below, we want to load both modules before running the test suite
      *
      * app.core is the 'core' module
      * app.dashboard contains the controller we will test in this suite
      */

    beforeEach(module('app.core'));
    beforeEach(module('app.dashboard'));

    var users;
    var usersRequest;
    var httpBackend;
    var q;

    /**
     * This block will create the controller and other necessary components
     * required for testing. 'inject' is part of the ngMocks and provides
     * access to the angular dependency injection pool
     */

     //$injector service helps fetch services from angular's dependency injection pool
     //$httpBackend facilitates testing HTTP requests
    beforeEach(inject(function($injector, $httpBackend){
      httpBackend = $httpBackend;
      users = $injector.get('users');
      q = $injector.get('$q');
    }));

    /**
     * Test suite for loadAllUsers
     */
    describe('loadAllUsers', function(){

      beforeEach(function(){
        //Registering a request with httpBackend
        usersRequest = httpBackend.whenGET('./datastore/users.json');
      });

      /**
       * Testing for response code 200
       */
      describe('status: 200', function(){

        var response = {
          status: 200,
          data: [{
            name: 'Bruce Wayne',
            occupation: 'detective'
          }]
        };

        beforeEach(function(){
          //returning a response of 200
          usersRequest.respond(response);

          //spyOn q.when to track promise propagation
          spyOn(q, 'when').and.callThrough();
        });

        afterEach(function(){
          //after each test, we should flush any pending requests to have a clean slate
          httpBackend.flush();
        });

        it('should resolve the promise chain with data', function(){
          users.loadAllUsers()
            .then(function(res){
              expect(res.status).toBe(200);
              expect(res.data).toEqual(response.data);
              expect(q.when).toHaveBeenCalled();
            }, null);
        });
      });

      describe('status: 401', function(){

        var response = {
          status: 401,
          message: 'Unauthorized'
        };

        beforeEach(function(){
          //returning a response of 401
          usersRequest.respond(response);

          //spyOn q.reject to track promise propagation
          spyOn(q, 'reject').and.callThrough();
        });

        afterEach(function(){
          httpBackend.flush();
        });

        it('should reject the promise chain with status code', function(){
          users.loadAllUsers()
            .then(null, function(res){
              expect(res.status).toBe(401);
              expect(res.message).toBe('Unauthorized');
              expect(q.reject).toHaveBeenCalled(res.status);
            });
        });
      });
    });

  });
}());
