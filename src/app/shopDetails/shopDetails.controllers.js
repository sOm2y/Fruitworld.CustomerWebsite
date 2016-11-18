(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopDetailsController', ShopDetailsController);

  /** @ngInject */
  function ShopDetailsController( $scope,fruitWorldAPIService, $location, $anchorScroll) {
    var vm = this;
    vm.quantity = 1;
    $location.hash('shopTop');
    $anchorScroll();
    if(localStorage.getItem('selectedProduct')){
      vm.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    }
  }
})();
