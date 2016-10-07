(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('home.shop', {
        url: '/shop',

            templateUrl: 'app/shop/shop.html',
            controller: 'ShopController',
            controllerAs: 'shop'


      })
      .state('home.shop.details', {
        url: '/details',
        views: {
          "shop-details-view": {
            templateUrl: 'app/shopDetails/shop-details.html',
            controller: 'ShopDetailsController',
            controllerAs: 'shopDetails'
          }
        }

      }).state('home.contact', {
        url: '/contact',

            templateUrl: 'app/contact/contact.html',
            controller: 'ContactController',
            controllerAs: 'contact'



      });

    $urlRouterProvider.otherwise('/home');
  }

})();
