(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ShopDetailsController', ShopDetailsController);

  /** @ngInject */
  function ShopDetailsController(fruitWorldAPIService) {
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
  }
})();
