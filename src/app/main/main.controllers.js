(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController( $rootScope,$timeout, toastr, fruitWorldAPIService, $state, shoppingCartService,$scope,loadingService) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474942052884;
    vm.showToastr = showToastr;
    
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      $rootScope.isLoading = true;
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

    $scope.$watch(function() {
      return localStorage.getItem('countedShoppingCart');
    }, function(newVal, oldVal) {
      if (localStorage.getItem('countedShoppingCart')) {
        $scope.countedProducts = shoppingCartService.getShoppingCart();
        shoppingCartService.getTotalPrice($scope.countedProducts);
      }
    }, true);

      fruitWorldAPIService.query({
        section: 'products/read/'
      })
      .$promise.then(function(res) {
        console.log(res);
        vm.products = res;

        vm.selectProduct = function(product) {
          vm.selectedProduct = product;
          localStorage.setItem('selectedProduct', JSON.stringify(vm.selectedProduct));
          console.log(vm.selectProduct);
          $state.go('shop.details');
        };
        
         $rootScope.isLoading = false;
      }, function(err) {
        console.log(err);
      });

    vm.addProduct = function(product,quantity) {
      shoppingCartService.addProduct(product,quantity);
      var updatedShoppingCart = JSON.parse(localStorage.getItem('countedShoppingCart'));
      shoppingCartService.getTotalPrice(updatedShoppingCart);
      // vm.$apply(); //run a digest cycle again to refesh dom
      vm.countedShoppingCart = shoppingCartService.getShoppingCart();
    };
    


    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

  
    
  }
})();
