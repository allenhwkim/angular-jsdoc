Angular-JSDoc
=============
AngularJS Template for JSDoc 3.  
A simple collection of JSDoc plugin and template for AngularJS, nothing else!  

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
       '-r app/scripts'                              // source code directory
   ])); 
   ```
3. run gulp task  
    `$ gulp docs`
