(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('BoxDetailsController', BoxDetailsController);

  /** @ngInject */
  function BoxDetailsController(fruitWorldAPIService, $scope, $location,$anchorScroll) {
      var vm = this;
      vm.quantity = 1;
      $location.hash('boxTop');
      $anchorScroll();
      if(localStorage.getItem('selectedBox'))
         vm.selectedBox = JSON.parse(localStorage.getItem('selectedBox'));
  }
})();
