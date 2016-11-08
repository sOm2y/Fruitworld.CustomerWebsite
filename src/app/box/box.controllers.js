(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('BoxController', BoxController);

  /** @ngInject */
  function BoxController(fruitWorldAPIService, $scope) {
    var vm = this;
    fruitWorldAPIService.query({
        section: 'box/read/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.boxes = res,
        vm.filteredBoxes = [],
        vm.currentPage = 1,
        vm.numPerPage = 12,
        vm.maxSize = 5;


        vm.pageChanged = function(){
          var begin = ((vm.currentPage - 1) * vm.numPerPage),
            end = begin + vm.numPerPage;

          vm.filteredBoxes = vm.boxes.slice(begin, end);
        };
        vm.pageChanged();

        vm.selectProduct = function(box) {
          vm.selectedBox = box;
          localStorage.setItem('selectedBox', JSON.stringify(vm.selectedBox));
          console.log(vm.selectedBox);
          $state.go('home.box.details');
        };
      }, function(err) {
        console.log(err);
      });
  }
})();
