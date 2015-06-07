/**
 * @ngdoc controller
 * @name app.dashboard.controller:Users
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.dashboard')
    .controller('Users', Users);

  /* @ngInject */
  function Users(users, $mdSidenav, $mdBottomSheet, $q, $document){

    var vm = this;

    vm.selected     = null;
    vm.users        = [ ];
    vm.selectUser   = selectUser;
    vm.toggleList   = toggleUsersList;
    vm.showContactOptions  = showContactOptions;
    init();

    ////////////////

    function init(){
      users.loadAllUsers()
        .then( function(users){
          vm.users    = [].concat(users);
          vm.selected = users[0];
        }, function(res){
          vm.errorStatus = res;
        });
    }

    function toggleUsersList(){
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectUser ( user ){
      vm.selected = angular.isNumber(user) ? vm.users[user] : user;
      vm.toggleList();
    }

    function showContactOptions($event){
        var user = vm.selected;

        return $mdBottomSheet.show({
          parent: angular.element($document.find('#content')),
          templateUrl: 'src/dashboard/contactSheet.html',
          controller: [ '$mdBottomSheet', ContactPanelController],
          controllerAs: 'vm',
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem){

        });

        function ContactPanelController( $mdBottomSheet ){
          this.user = user;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , iconUrl: '../images/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , iconUrl: '../images/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , iconUrl: '../images/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , iconUrl: '../images/hangouts.svg'}
          ];
          this.submitContact = function(action){
            $mdBottomSheet.hide(action);
          };
        }
    }
  }

}());
