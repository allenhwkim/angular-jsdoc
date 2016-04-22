(function () {
  'use strict';

  angular
      .module('app')
      .config(stateConfig);

  /**
   * Configures ui-router's states.
   * @memberof app
   * @ngdoc config
   * @name config
   * @param {Service} $urlRouterProvider Watches $location and provides interface to default state
   */

  function stateConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/search')
  }

  /**
   * app.config internal operations.
   * @class
   * @ignore
   * @ngdoc object
   * @memberof app
   * @private
   */
  function internalClass() {}

  /**
   * A private function that should be ignored by the JSDOC generator. You should not see this generated
   * in the generated documentation.
   *
   * @ngdoc method
   * @function
   * @ignore
   * @returns {boolean} A boolean indicating if the NSA is watching you.
   */
  internalClass.prototype.ignoredFunction = function() {
    return true;
  }
})();
