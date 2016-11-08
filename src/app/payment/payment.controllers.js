(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('PaymentController', PaymentController);

  /** @ngInject */
  function PaymentController($http) {
    var vm = this;
    $http.get('http://fruitworldwebapi.azurewebsites.net/api/TransactionClients/token').then(function(res) {
        console.log(res);
				braintree.setup(res.data, "dropin", {
					container: "payment-form",
					paymentMethodNonceReceived: function (event, nonce) {

						vm.message = 'Processing your payment...';
						vm.showDropinContainer = false;

						$http({
							method: 'POST',
							url: 'http://fruitworldwebapi.azurewebsites.net/api/TransactionClients/CreateTransation',
							data: {
								amount: vm.amount,
								payment_method_nonce: nonce,
                orderId: 'ORD0005601399'
							}
						}).success(function (data) {
							vm.transation = data;
							console.log(data.success);

							if (data.success) {
								vm.message = 'Payment authorized, thanks.';
								vm.showDropinContainer = false;
								vm.isError = false;
								vm.isPaid = true;

							} else {
								// implement your solution to handle payment failures
								vm.message = 'Payment failed: ' + data.message + ' Please refresh the page and try again.';
								vm.isError = true;
							}

						}).error(function (error) {
							vm.message = 'Error: cannot connect to server. Please make sure your server is running.';
							vm.showDropinContainer = false;
							vm.isError = true;
						});

					}
				});
			});



  }
})();
