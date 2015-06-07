(function(){

  /* global module, inject */

  'use strict';

  describe('Filter: pagination', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var pagination;
    var list;
    var currentPage;
    var recordsPerPage;

    beforeEach(inject(function (paginationFilter){

      pagination = paginationFilter;

    }));

    describe('empty list', function(){
      beforeEach(function(){
        list = [];
        currentPage = 1;
        recordsPerPage = 10;
      });

      it('should throw error that list is empty', function(){
        expect(function(){
          pagination(list, currentPage, recordsPerPage);
        }).toThrow('List either undefined or empty');
      });
    });

    describe('undefined parameters', function(){
      beforeEach(function(){
        list = [{name:'Bruce Wayne'}, {name: 'Clark Kent'}];
      });

      it('should throw an error if currentPage is undefined', function(){
        currentPage = undefined;
        recordsPerPage = 10;

        expect(function(){
          pagination(list, currentPage, recordsPerPage);
        }).toThrow('Parameters for filter are not defined. [Param 1: current page, Param 2: records per page]');
      });

      it('should throw an error if recordsPerPage is undefined', function(){
        currentPage = 1;
        recordsPerPage = undefined;

        expect(function(){
          pagination(list, currentPage, recordsPerPage);
        }).toThrow('Parameters for filter are not defined. [Param 1: current page, Param 2: records per page]');
      });
    });

    describe('filtering', function(){
      beforeEach(function(){
        var resultExpectations = [];
        list = [
          {name: 'Bruce Wayne'},
          {name: 'Clark Kent'},
          {name: 'Jean Grey'},
          {name: 'Scott Summers'},
          {name: 'Johnny Bravo'},
          {name: 'Mojo Jojo'},
          {name: 'Peter Parker'},
          {name: 'Charles Xavier'}
        ];

        //currentPage 1, recordsPerPage 2
        resultExpectations.push({
          currentPage: 1,
          recordsPerPage: 2,
          result: [
            {name: 'Bruce Wayne'},
            {name: 'Clark Kent'}
          ]
        });

        //currentPage 2, recordsPerPage 2
        resultExpectations.push({
          currentPage: 2,
          recordsPerPage: 2,
          result: [
            {name: 'Jean Grey'},
            {name: 'Scott Summers'}
          ]
        });

        //currentPage 2, recordsPerPage 8
        resultExpectations.push({
          currentPage: 1,
          recordsPerPage: 8,
          result: [
            {name: 'Bruce Wayne'},
            {name: 'Clark Kent'},
            {name: 'Jean Grey'},
            {name: 'Scott Summers'},
            {name: 'Johnny Bravo'},
            {name: 'Mojo Jojo'},
            {name: 'Peter Parker'},
            {name: 'Charles Xavier'}
          ]
        });

        //currentPage 2, recordsPerPage 8
        resultExpectations.push({
          currentPage: 2,
          recordsPerPage: 8,
          result: []
        });

        it('should return correct paging data', function(){
          resultExpectations.forEach(function(record){
            expect(pagination(list, record.currentPage, record.recordsPerPage)).toEqual(record.result);
          });
        });
      });
    });

  });
}());
