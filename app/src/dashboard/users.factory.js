/**
 * @ngdoc service
 * @name app.dashboard.users
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.dashboard')
    .factory('users', users);

  /* @ngInject */
  function users($http, $q){

    return {
      loadAllUsers : function(){
        // Simulate async nature of real remote calls
        return $http.get('./datastore/users.json')
          .then(function(res){
            return $q.when(res.data);
          }, function(res){
            return $q.reject(res.status);
          });
      }
    };

  }

}());
