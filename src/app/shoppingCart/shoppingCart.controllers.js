(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShoppingCartController', ShoppingCartController);

  /** @ngInject */
  function ShoppingCartController(shoppingCartService) {
    var vm = this;
    vm.countedShoppingCart = shoppingCartService.getShoppingCart();
    vm.hasShoppingCartChanged = false;
    vm.countedShoppingCart = shoppingCartService.getShoppingCart();
    vm.addToBox = function(products) {
      //TODO
    };
    vm.updateProductCount = function(index, updatedProduct) {
      vm.countedShoppingCart[index].count = updatedProduct.count;
      shoppingCartService.getTotalPrice(vm.countedShoppingCart);
      vm.hasShoppingCartChanged = true;
    };
    vm.updateShoppingCart = function() {
      localStorage.setItem('countedShoppingCart', JSON.stringify(vm.countedShoppingCart));
    };
    vm.deleteCartProduct = function(deleteProduct) {
      vm.countedShoppingCart = shoppingCartService.removeProduct(deleteProduct, vm.countedShoppingCart);
      shoppingCartService.getTotalPrice(vm.countedShoppingCart);
    };
  }
})();
