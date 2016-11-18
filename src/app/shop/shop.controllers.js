(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopController', ShopController);

  /** @ngInject */
  function ShopController($rootScope, $scope,fruitWorldAPIService,$state,shoppingCartService) {
    var vm = this;
    
    fruitWorldAPIService.query({
        section: 'products/read/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.products = res;
        
        vm.filteredProducts = [],
        vm.currentPage = 1,
        vm.numPerPage = 12,
        vm.maxSize = 5;
        

        vm.pageChanged = function(){
          var begin = ((vm.currentPage - 1) * vm.numPerPage),
            end = begin + vm.numPerPage;

          vm.filteredProducts = vm.products.slice(begin, end);
        };
        vm.pageChanged();
        
        vm.selectProduct = function(product) {
          vm.selectedProduct = product;
          localStorage.setItem('selectedProduct', JSON.stringify(vm.selectedProduct));
          console.log(vm.selectProduct);
          if($rootScope.currentState === 'shop.details'){
             $state.go('shop.details',{productId: product.productId});
          }else{
             $state.go('shop.details',{productId: product.productId});
          }
         
        };
         $rootScope.isLoading = false;
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
      
      vm.addProduct = function(product,quantity) {
        shoppingCartService.addProduct(product,quantity);
        var updatedShoppingCart = JSON.parse(localStorage.getItem('countedShoppingCart'));
        shoppingCartService.getTotalPrice(updatedShoppingCart);
        // vm.$apply(); //run a digest cycle again to refesh dom
        vm.countedShoppingCart = shoppingCartService.getShoppingCart();
      };
  }
})();
