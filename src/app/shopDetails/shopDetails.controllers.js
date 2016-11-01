(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopDetailsController', ShopDetailsController);

  /** @ngInject */
  function ShopDetailsController(fruitWorldAPIService) {
    var vm = this;
    vm.quantity = 1;
    vm.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  }
})();
