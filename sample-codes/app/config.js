(function () {
    'use strict';

    angular
    .module('app')
    .config(stateConfig)

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
})();
