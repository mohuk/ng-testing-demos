/**
 * @ngdoc overview
 * @name app.dashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.dashboard', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider, $mdThemingProvider, $mdIconProvider){

    //add your state mappings here
    $stateProvider
      .state('users', {
          url:'/users',
          templateUrl:'src/dashboard/users.html',
          controller: 'Users as vm'
        }
      );

    $mdIconProvider
      .defaultIconSet('../images/avatars.svg', 128)
      .icon('menu'       , '../images/menu.svg'        , 24)
      .icon('share'      , '../images/share.svg'       , 24)
      .icon('google_plus', '../images/google_plus.svg' , 512)
      .icon('hangouts'   , '../images/hangouts.svg'    , 512)
      .icon('twitter'    , '../images/twitter.svg'     , 512)
      .icon('phone'      , '../images/phone.svg'       , 512);
      $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');
  }

}());
