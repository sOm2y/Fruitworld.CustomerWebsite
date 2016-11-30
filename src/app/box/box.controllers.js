(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('BoxController', BoxController);

  /** @ngInject */
  function BoxController( $rootScope,fruitWorldAPIService,$scope,$state,shoppingCartService) {
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

        vm.selectBox = function(box) {
          vm.selectedBox = box;
          localStorage.setItem('selectedBox', JSON.stringify(vm.selectedBox));
          console.log(vm.selectedBox);
          $state.go('box.details',{boxId:box.boxId});
        };
        
        $rootScope.isLoading = false;
      }, function(err) {
        console.log(err);
      });
      
      vm.addProduct = function(product,quantity) {
        shoppingCartService.addProduct(product,quantity);
        var updatedShoppingCart = JSON.parse(localStorage.getItem('countedShoppingCart'));
        console.log(updatedShoppingCart);
        shoppingCartService.getTotalPrice(updatedShoppingCart);
        // vm.$apply(); //run a digest cycle again to refesh dom
        vm.countedShoppingCart = shoppingCartService.getShoppingCart();
      };
  }
})();
