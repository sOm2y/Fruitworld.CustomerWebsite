(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopController', ShopController);

  /** @ngInject */
  function ShopController(fruitWorldAPIService,$state) {
    var vm = this;

    fruitWorldAPIService.query({
        section: 'products/read/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.products = res;
      }, function(err) {
        console.log(err);
      });
    fruitWorldAPIService.query({
        section: 'products/category/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.categories = res;
      }, function(err) {
        console.log(err);
      });
      vm.selectProduct = function(product){
        vm.selectedProduct = product;
        console.log(vm.selectedProduct);
        $state.go('shop.details');
      };
  }
})();
