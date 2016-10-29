(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr,fruitWorldAPIService,$state) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474942052884;
    vm.showToastr = showToastr;

    fruitWorldAPIService.query({
        section: 'products/read/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.products = res;

        vm.selectProduct = function(product){
          vm.selectedProduct = product;
          $state.go('home.shop.details');
        }
      }, function(err) {
        console.log(err);
      });

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
