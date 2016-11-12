(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController( $rootScope,$timeout, webDevTec, toastr, fruitWorldAPIService, $state, shoppingCartService,$scope) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474942052884;
    vm.showToastr = showToastr;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        // $rootScope.isLoading = true;
    	var requireLogin = toState.data.requireLogin;
      $rootScope.buttonDisable = false;
			if(localStorage.getItem('oauth_token')){
				var user = localStorage.getItem('oauth_token');
				$rootScope.setUserAuth(user);
			}else{
        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
          event.preventDefault();

          $state.go('home.account');

        }
			}
    });

    $rootScope.setUserAuth = function(oauth){
      var authHeader = 'Bearer '+oauth.access_token;
      $http.defaults.headers.common.Authorization = authHeader;
  };

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

        vm.selectProduct = function(box) {
          vm.selectedBox = box;
          localStorage.setItem('selectedBox', JSON.stringify(vm.selectedBox));
          console.log(vm.selectedBox);
          $state.go('home.box.details');
        };
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
