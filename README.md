Angular-JSDoc
=============
AngularJS Template for JSDoc 3.  
A simple collection of JSDoc plugin and template for AngularJS, nothing else!  

![Imgur](http://i.imgur.com/FPo9x25.gif)

Features
----------
  * Right side table of contents for navigation by Directives, Services, Controllers, etc
  * Read and process @ngdoc tag

How Does It Look Like
---------------------
  * [angularjs-goolge-maps Documentation](https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/docs/index.html)

Install
-------
    $ npm install jsdoc angular-jsdoc --save-dev
  
Run
---
Run jsdoc command to generate your documentation. 
All command line options are the options of [jsdoc](http://usejsdoc.org/about-commandline.html)  
    
    $ path/to/jsdoc -c path to conf> -t <template> <your source code>

In example,  

    `$ node_modules/jsdoc/jsdoc.js -c node_modules/angular-jsdoc/conf -t node_modules/angular-jsdoc/template -r myDir`

Run with gulp-jsdoc
-------------------

1. install gulp-jsdoc  
    `$ npm install gulp-shell --save-dev`

2. add the following to the gulpfile.json  
   ```
   var shell = require('gulp-shell'); 
   gulp.task('docs', shell.task([ 
     'node_modules/jsdoc/jsdoc.js '+ 
       '-c node_modules/angular-jsdoc/conf.json '+   // config file
       '-t node_modules/angular-jsdoc/template '+    // template file
       '-d build/docs '+                             // output directory
       './README.md ' +                              // to include README.md as index contents
       '-r app/scripts'                              // source code directory
   ])); 
   ```
3. run gulp task  
    `$ gulp docs`


Example of Directive Documentation
----------------------------------
```
/**
 * @ngdoc directive
 * @name map
 * @requires Attr2Options
 * @requires $parse
 * @requires NavigatorGeolocation
 * @requires GeoCoder
 * @requires $compile
 * @description 
 *   Implementation of {@link MapController}  
 *   Initialize a Google map within a `<div>` tag with given options and register events  
 *   It accepts children directives; marker, shape, info-window, or marker-clusterer  
 *   
 *   It initialize map, children tags, then emits message as soon as the action is done  
 *   The message emitted from this directive are;  
 *     . mapInitialized
 *     . markersInitialized
 *     . shapesInitialized
 *     . infoWindowInitialized
 *     . markerClustererInitializd
 *
 *   Restrict To:
 *     Element Or Attribute
 *
 * @param {String} MapOption Any Google map options, https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapOptions  
 * @param {String} MapEvent Any Google map events, https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/map_events.html
 * @example
 * Usage: 
 *   <map MAP_OPTIONS_OR_MAP_EVENTS ..>
 *     ... Any children directives
 *   </map>
 *   Or, 
 *   <ANY map MAP_OPTIONS_OR_MAP_EVENTS ..>
 *     ... Any children directives
 *   </ANY>
 *
 * Example: 
 *   <map center="[40.74, -74.18]" on-click="doThat()">
 *   </map>
 *
 *   <div map center="[40.74, -74.18]" on-click="doThat()">
 *   </div>
 */
 app.directive('map', function(Attr2Options, $parse, NavigatorGeolocation, GeoCoder, $compile) {
 ...
 });
```

Example of Service Documentation
--------------------------------
```
/**
 * @ngdoc service
 * @name Attr2Options
 * @description 
 *   Converts tag attributes to options used by google api v3 objects, map, marker, polygon, circle, etc.
 */
ngMap.services.Attr2Options = function() {
  return {
    /**
     * @description
     * converts attributes hash to Google Maps API v3 options  
     *  . converts numbers to number   
     *  . converts class-like string to google maps instance   
     *    i.e. `LatLng(1,1)` to `new google.maps.LatLng(1,1)`  
     *  . converts constant-like string to google maps constant    
     *    i.e. `MapTypeId.HYBRID` to `google.maps.MapTypeId.HYBRID`   
     *    i.e. `HYBRID"` to `google.maps.MapTypeId.HYBRID`  
     * @memberof Attr2Options
     * @param {Hash} attrs tag attributes
     * @param {scope} scope angularjs scope
     * @returns {Hash} options converted attributess
     */
    getOptions: function(attrs, scope) {
      ...
    }
  }
}
```

Example of Controller Documentation
-----------------------------------
TODO :)
