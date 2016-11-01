(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, fruitWorldAPIService, $state, shoppingCartService,$scope) {
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
          localStorage.setItem('selectedProduct',JSON.stringify(vm.selectedProduct));
          console.log(vm.selectedProduct);
          $state.go('home.shop.details');
        };
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

    $scope.$watch(function() {
      return localStorage.getItem('countedShoppingCart');
    }, function(newVal, oldVal) {
      if (localStorage.getItem('countedShoppingCart')) {
        $scope.countedProducts = shoppingCartService.getShoppingCart();
        shoppingCartService.getTotalPrice($scope.countedProducts);
      }
    }, true);

    vm.addProduct = function(product,quantity) {
      shoppingCartService.addProduct(product,quantity);
      var updatedShoppingCart = JSON.parse(localStorage.getItem('countedShoppingCart'));
      shoppingCartService.getTotalPrice(updatedShoppingCart);
      // vm.$apply(); //run a digest cycle again to refesh dom
      vm.countedShoppingCart = shoppingCartService.getShoppingCart();
    };
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
