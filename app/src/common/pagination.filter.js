/**
 * @ngdoc filter
 * @name app.common.filer:pagination
 * @description < description placeholder >
 * @param {object} input object to be filtered
 * @returns {object} < returns placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.common')
    .filter('pagination', pagination);

  /* @ngInject */
  function pagination(){
    return function (list, currentPage, recordsPerPage){
        var startSelectionIndex;
        var endSelectionIndex;

        if(angular.isUndefined(list) || list.length <= 0){
          throw ('List either undefined or empty');
        }

        if(angular.isUndefined(currentPage) || angular.isUndefined(recordsPerPage)){
          throw ('Parameters for filter are not defined. [Param 1: current page, Param 2: records per page]');
        }

        currentPage = currentPage - 1;
        startSelectionIndex = currentPage * recordsPerPage;
        endSelectionIndex = startSelectionIndex + recordsPerPage;

        return list.slice(startSelectionIndex, endSelectionIndex);
    };
  }

}());
