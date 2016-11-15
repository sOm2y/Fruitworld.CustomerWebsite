(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('BoxDetailsController', BoxDetailsController);

  /** @ngInject */
  function BoxDetailsController(fruitWorldAPIService, $scope) {
       var vm = this;
      if(localStorage.getItem('selectedBox'))
         vm.selectedBox = JSON.parse(localStorage.getItem('selectedBox'));
  }
})();