(function () {
  'use strict';

  angular.module('app').service('testService', testService);

  /**
   * @memberof app
   * @ngdoc service
   * @name testService
   * @param {$http} Test
   * @property {object} obj property of this service
   * @ngInject
   * @desc The siteLanguageServices provides information about available languges
   * of a site.
   *
   */
  function testService ($http) {

    /** @property {object} obj property of this service */
    var obj = {};

     /**
      * @memberof testService
      * @method test
      * ///// NO param jsdoc tag here
      */
    function test() {
    }

  }

})();
