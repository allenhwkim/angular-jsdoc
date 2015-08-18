(function() {
  'use strict';

  /**
   * @memberof ngmap
   * @ngdoc controller
   * @name MapController
   * @param $scope {service} controller scope
   * @param $q {service} promise service
   * @param NavigatorGeolocation {service} Google NavigatorGeolocation wrapper
   * @param GeoCoder {service} Google GeoCoder wrapper
   * @param Attr2Options {service} Converts element attributes to Google Maps API options
   */
  var MapController = function($scope, $q, NavigatorGeolocation, GeoCoder, Attr2Options) { 

    /**
     * @property {Hash} _objects collection og objects that belongs to this map
     */
    this._objects = {};

    /**
     * Add an object to the collection of group
     * @memberof MapController
     * @function addObject
     * @param groupName the name of collection that object belongs to
     * @param obj  an object to add into a collection, i.e. marker, shape
     */
    this.addObject = function(groupName, obj) {
      // .. code ..
    };

    /**
     * Delete an object from the collection and remove from map
     * @memberof MapController
     * @function deleteObject
     * @param {Array} objs the collection of objects. i.e., map.markers
     * @param {Object} obj the object to be removed. i.e., marker
     */
    this.deleteObject = function(groupName, obj) {
      // .. code ..
    };

    /**
     * returns the location of an address or 'current-location'
     * @memberof MapController
     * @function getGeoLocation
     * @param {String} string an address to find the location
     * @returns {Promise} latlng the location of the address
     */
    this.getGeoLocation = function(string) {
      // .. code ..
    };

  };

  angular.module('ngMap').controller('MapController', MapController);
})();
