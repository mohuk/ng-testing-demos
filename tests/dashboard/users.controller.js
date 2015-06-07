(function(){

  /* global module, inject */

  'use strict';

  /**
   * This is where all the testing greatness begins
   * prefixing a describe block with 'f' runs only this block and ignore all others
   * prefixing it with an 'x' omits this block altogether
   */

  describe('Controller: Users', function(){

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

    var ctrl;
    var users;
    var loadUsersDeferred;
    var q;
    var rootScope;

    /**
     * This block will create the controller and other necessary components
     * required for testing. 'inject' is part of the ngMocks and provides
     * access to the angular dependency injection pool
     */

     //$controller service facilitates making controller instances
     //$injector service helps fetch services from angular's dependency injection pool
    beforeEach(inject(function($controller, $injector){

      //users service can be injected like $controller above
      //but using injector is a much cleaner approach
      //usually we have long lists of injections which look untidy
      users = $injector.get('users');
      q = $injector.get('$q');
      rootScope = $injector.get('$rootScope');

      //Spying on objects allow tests to be more precise by tracking the object activity
      //below we are tracking the users service object's loadAllUsers method returning a
      //promise to the controller
      loadUsersDeferred = q.defer();
      spyOn(users, 'loadAllUsers').and.returnValue(loadUsersDeferred.promise);

      //controller is instantiated with the $controller service and any injected dependencies
      //can be passed in the object as the second parameter. If we cant to track how a controller
      //consumes the service, we install spies on the service and inject it into the controller
      //as demonstrated below
      ctrl = $controller('Users', {
        users: users
      });

    }));

    /**
     * Similar to beforeEach, afterEach executes after each test run.
     * This is usually used to flush out values or reset the component state.
     */
    afterEach(function(){
      ctrl.users = [];
    });

    /**
     * we use nested describe blocks to test methods of the component under test. This enables
     * us with cleaner and encapsulated tests against each method.
     */

    describe('init', function(){

      /**
       * it blocks are the actual tests which contain the expectation of what the controller should
       * do. It contains a small descrition and a function which executes code and varifies expectations
       * Below, the test is verifying that once the controller instantiates, it makes a call to the
       * loadAllUsers method from the users service.
       */
      it('should define vars and functions', function(){
        expect(users.loadAllUsers).toHaveBeenCalled();
      });

      //promise resolution
      it('should set users on success', function(){
        //response of the service
        var response = [
            {
              name: 'Bruce Wayne',
              occupation: 'detective'
            }
          ];

        //resolving the promise with the response
        loadUsersDeferred.resolve(response);

        //call to digest triggers the digest cycle and executes the provided handlers
        //for promise resolution
        rootScope.$digest();

        //verifying the expectatons on success
        expect(ctrl.users).toEqual(response);
        expect(ctrl.selected).toEqual(response[0]);
      });

      //promise rejection
      it('should set errorStatus on failure', function(){
        //setting the error response
        var response = {
          status: 401,
          message: 'Unauthorized'
        };

        //rejecting promise with error response
        loadUsersDeferred.reject(response);

        //kicking off the digest cycle
        rootScope.$digest();

        //verifying expections on failure
        expect(ctrl.errorStatus).toEqual(response);
      });
    });

    describe('selectUser', function(){
      /**
       * if there is no need, we can skip the beforeEach block altogether
       */

      it('should call toggleList on selectUser', function(){
        //installing a spy to track
        spyOn(ctrl, 'toggleList').and.callThrough();

        //calling function
        ctrl.selectUser({});

        //verifying expectation
        expect(ctrl.toggleList).toHaveBeenCalled();
      });

      it('should set the user to selected if param is not a number', function(){
        //defining an object param
        var param = {
          name: 'Bruce Wayne',
          occupation: 'detective'
        };

        //calling function with the object param
        ctrl.selectUser(param);

        //verifying expectation
        expect(ctrl.selected).toEqual(param);
      });

      it('should set the user on the index of the users collection if param is a number', function(){
        var param = 1;
        ctrl.users = [
          {
            name: 'Bruce Wayne',
            occupation: 'detective'
          },
          {
            name: 'Micheal Jackson',
            occupation: 'entertainer'
          }
        ];

        ctrl.selectUser(param);
        expect(ctrl.selected).toEqual(ctrl.users[param]);
      });

    });

  });
}());
