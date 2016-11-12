(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        data: {
            requireLogin: false
        }
      })
      .state('home.shop', {
        url: 'shop',
        templateUrl: 'app/shop/shop.html',
        controller: 'ShopController',
        controllerAs: 'shop',
        data: {
            requireLogin: false
        }
      })
      .state('home.account', {
        url: 'account',
        templateUrl: 'app/account/account.html',
        controller: 'AccountController',
        controllerAs: 'account',
        data: {
            requireLogin: false
        }
      })
      .state('home.payment', {
        url: 'payment',
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentController',
        controllerAs: 'payment',
        data: {
            requireLogin: true
        }
      })
      .state('home.payment.address', {
        url: '/address',
        templateUrl: 'app/payment/payment-address.html',
        data: {
            requireLogin: true
        }
      })
      .state('home.payment.billing', {
        url: '/billing',
        templateUrl: 'app/payment/payment-billing.html',
        data: {
            requireLogin: true
        }
      })
      .state('home.payment.shipping', {
        url: '/shipping',
        templateUrl: 'app/payment/payment-shipping.html',
        data: {
            requireLogin: true
        }
      })
      .state('home.payment.method', {
        url: '/method',
        templateUrl: 'app/payment/payment-method.html',
        data: {
            requireLogin: true
        }
      })
      .state('home.payment.order', {
        url: '/order',
        templateUrl: 'app/payment/payment-order.html',
        data: {
            requireLogin: true
        }
      })
      .state('home.shop.details', {
        url: '/details',
        views: {
          "shop-details-view": {
            templateUrl: 'app/shopDetails/shop-details.html',
            controller: 'ShopDetailsController',
            controllerAs: 'shopDetails'
          }
        },
        data: {
            requireLogin: false
        }
      })

    .state('home.box', {
        url: 'box',
        templateUrl: 'app/box/box.html',
        controller: 'BoxController',
        controllerAs: 'box',
        data: {
            requireLogin: false
        }
      })
      .state('home.box.details', {
        url: '/details',
        views: {
          "box-details-view": {
            templateUrl: 'app/box/boxDetails.html',
            controller: 'BoxController',
            controllerAs: 'boxDetails'
          }
        },
        data: {
            requireLogin: false
        }
      }).state('home.contact', {
        url: 'contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact',
        data: {
            requireLogin: false
        }
      })
      .state('home.shoppingCart', {
        url: 'shopping-cart',
        templateUrl: 'app/shoppingCart/shoppingCart.html',
        controller: 'ShoppingCartController',
        controllerAs: 'shoppingCart',
        data: {
            requireLogin: false
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
