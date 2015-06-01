Angular-JSDoc
=============
JSDoc 3 Template for AngularJS.  
A JSDoc plugin and template for AngularJS, nothing else!  

<img src=http://i.imgur.com/FPo9x25.gif width=50%  />

Features
----------
  * Right side TOC, table of contents,  for navigation by Directives, Services, Controllers, etc
  * Read and process @ngdoc tag

How Does It Look Like
---------------------
  * [angularjs-google-maps Documentation](https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/docs/index.html)

Install
-------
    $ npm install jsdoc angular-jsdoc --save-dev
  
Run In Command Line
-------------------
Run jsdoc command to generate your documentation. 
All command line options are the options of [jsdoc](http://usejsdoc.org/about-commandline.html)  
    
    $ path/to/jsdoc -c path to conf> -t <template> <your source code>

In example,  

    `$ node_modules/jsdoc/jsdoc.js -c node_modules/angular-jsdoc/conf.json -t node_modules/angular-jsdoc/template -r myDir`

Run with gulp-jsdoc
-------------------

1. install gulp-shell  
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


[Example of Directive Documentation](https://github.com/allenhwkim/angularjs-google-maps/blob/master/app/scripts/directives/map.js)

[Example of Service Documentation](https://github.com/allenhwkim/angularjs-google-maps/blob/master/app/scripts/services/attr2_options.js)
