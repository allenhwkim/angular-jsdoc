(function() {
  'use strict';

  /**
   * @memberof ngmap
   * @ngdoc service
   * @name Attr2Options
   * @param {service} $parse angular html parser
   * @param {service} $timeout angular window.setTimeout service
   * @param {service} NavigatorGeolocation Google NavigatorGeolocation wrapper
   * @param {service} GeoCoder Google GeoCoder wrapper
   * @description 
   *   Converts html attributes to google api v3 object options
   */
  var Attr2Options = function($parse, $timeout, NavigatorGeolocation, GeoCoder) { 

    /**
     * Convert input to Google Map option input
     * @memberof Attr2Options
     * @param {Objec} input a value to convert
     * @param {Hash} options to convert the input
     * @returns {Hash} attributes
     */
    var toOptionValue = function(input, options) {
      // .. code ..
    };

    /**
     * filters attributes by skipping angularjs methods $.. $$..
     * @memberof Attr2Options
     * @param {Hash} attrs tag attributes
     * @returns {Hash} filterd attributes
     */
    var filter = function(attrs) {
      // .. code ..
    };

    /**
     * converts attributes hash to Google Maps API v3 options  
     * ```
     *  . converts numbers to number   
     *  . converts class-like string to google maps instance   
     *    i.e. `LatLng(1,1)` to `new google.maps.LatLng(1,1)`  
     *  . converts constant-like string to google maps constant    
     *    i.e. `MapTypeId.HYBRID` to `google.maps.MapTypeId.HYBRID`   
     *    i.e. `HYBRID"` to `google.maps.MapTypeId.HYBRID`  
     * ```
     * @memberof Attr2Options
     * @param {Hash} attrs tag attributes
     * @param {scope} scope angularjs scope
     * @returns {Hash} options converted attributess
     */
    var getOptions = function(attrs, scope) {
      // .. code ..
    };

    /**
     * converts attributes hash to scope-specific event function 
     * @memberof Attr2Options
     * @param {scope} scope angularjs scope
     * @param {Hash} attrs tag attributes
     * @returns {Hash} events converted events
     */
    var getEvents = function(scope, attrs) {
      // .. code ..
    };

    /**
     * Return options of Google map control, i.e streetview, pan, etc, not a general control
     * @memberof Attr2Options
     * @param {Hash} filtered filtered tag attributes
     * @returns {Hash} Google Map options
     */
    var getControlOptions = function(filtered) {
      // .. code ..
    };

    return {
      filter: filter,
      getOptions: getOptions,
      getEvents: getEvents,
      getControlOptions: getControlOptions,
      toOptionValue: toOptionValue,
      orgAttributes: orgAttributes
    }; // return

  }; 

  angular.module('ngMap').service('Attr2Options', Attr2Options);
})();
