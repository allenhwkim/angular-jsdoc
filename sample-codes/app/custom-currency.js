/**
 * The siteLanguageServices provides information about available languges
 * of a site.
 *
 * @memberof app
 * @ngdoc filter
 * @name customCurrency
 * @param {$http} Test
 * @desc
 *  returns custom currency from the given input
 */
(function() {
  'use strict';
  var customCurrency = function($http) { 


    /**
     * @func customCurrencyFilter
     * @memberof customCurrency
     * @desc
     *  . Create the return function and set the required parameter name to **input**
     *  . setup optional parameters for the currency symbol and location (left or right of the amount)
     * @param {Number|String} input
     * @param {String} symbol
     * @param {Boolean} place  true or false
     */
    return function(input, symbol, place) {

      // Ensure that we are working with a number
      if(isNaN(input)) {
        return input;
      } else {

        // Check if optional parameters are passed, if not, use the defaults
        var symbol = symbol || '$';
        var place = place === undefined ? true : place;

        // Perform the operation to set the symbol in the right location
        if( place === true) {
          return symbol + input;
        } else {
          return input + symbol;
        }

      }
    }
  };

  angular.module('app').filter('customCurrency', customCurrency);
})();

