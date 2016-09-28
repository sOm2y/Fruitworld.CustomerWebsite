(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
