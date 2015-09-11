(function () {
  'use strict';

  /**
   * @memberof ngmap
   * @ngdoc directive
   * @name map
   * @param  {service} Attr2Options Converts html attributes to Google map options
   * @param  {service} $timeout     Angular window.setTimeout wrapper 
   * @param  {service} $parse       Angular html parser
   * @description
   *   Implementation of MapController
   *   Initialize a Google map within a `<div>` tag with given options and register events
   *   It accepts children directives; marker, shape, or marker-clusterer
   *
   *   It initialize map, children tags, then emits message as soon as the action is done
   *   The message emitted from this directive is;
   *     . mapInitialized
   *
   * @attr {Expression} geo-callback 
   *    If center is an address or current location, the expression is will be executed 
   *    when geo-lookup is successful. e.g., geo-callback="showMyStoreInfo()"
   * @attr {Array} geo-fallback-center  The center of map incase geolocation failed. i.e. [0,0]
   * @attr {Boolean} zoom-to-include-markers
   *    If true, map boundary will be changed automatially to include all markers when initialized
   * @attr {Boolean} default-style
   *    When false, the default styling, `display:block;height:300px`, will be ignored.
   * @attr {String} init-event The name of event to initialize this map.
   *    If this option is given, the map won't be initialized until the event is received.
   *    To invoke the event, use $scope.$emit or $scope.$broacast.
   *    i.e. `<map init-event="init-map" ng-click="$emit('init-map')" center=... ></map>`
   * @attr {String} &lt;MapOption> [Any Google map options](https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapOptions)
   * @attr {String} &lt;MapEvent> [Any Google map events](https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/map_events.html)
   * @example
   *   Usage:
   *   <map MAP_OPTIONS_OR_MAP_EVENTS ..>
   *     ... Any children directives
   *   </map>
   *
   *   <map center="[40.74, -74.18]" on-click="doThat()">
   *   </map>
   *
   *   <map geo-fallback-center="[40.74, -74.18]" zoom-to-inlude-markers="true">
   *   </map>
   */
  var map = function(Attr2Options, $timeout, $parse) {

    /**
     * Initialize map and events
     * @memberof map
     * @param {service} scope the scope of this element
     * @param {service} element element that this direcive is assigned to
     * @param {service}   attrs attribute of this element
     * @param {MapController} ctrl map controller
     */
    var linkFunc = function (scope, element, attrs, ctrl) {
      // .. code ..
    };

    return {
      restrict: 'AE',
      controller: 'MapController',
      link: linkFunc,
      templateUrl: 'sample-codes/ngmap/test-template.html'
    };
  };

  angular.module('ngMap').directive('map', map);
})();
