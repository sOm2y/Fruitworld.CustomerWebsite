(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopDetailsController', ShopDetailsController);

  /** @ngInject */
  function ShopDetailsController(fruitWorldAPIService) {
    var vm = this;
    vm.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  }
})();
