Angular-JSDoc
=============
AngularJS Template for JSDoc 3.  
A simple collection of JSDoc plugin and template for AngularJS, nothing else!  

Features
________
 
  * Right side TOC for navigation by Directives, Services, Controllers, etc
  * Read and process @ngdoc tag

How Does It Look Like
---------------------

  * [angularjs-goolge-maps](https://github.com/allenhwkim/angularjs-google-maps/build/doc)

Install
-------

    $ npm install jsdoc angular-jsdoc --save-dev
  
Run
---

Run jsdoc command to generate your documentation. 
All command line options are the options of [jsdoc](http://usejsdoc.org/about-commandline.html)
  
$ path/to/jsdoc -c <path to conf> -t <template> <your source code>

In example, 

   $ node_modules/jsdoc/jsdoc.js -c node_modules/angular-jsdoc/conf -t node_modules/angular-jsdoc/template myDir

Run with gulp-jsdoc
-------------------

1. install gulp-jsdoc
   
    $ npm install gulp-jsdoc --save-dev

2. add the following to the gulpfile.json
    
    var jsdoc = require('gulp-jsdoc');

    gulp.task('doc', function() {
      return gulp.src(['./src'])                         // source directory
        .pipe(jsdoc('./build/docs',                      // target directory
          {path: 'node_modules/angular-jsdoc/template'}, // template directory
          {plugins: [                                    // plugin files
            'node_moduels/jsdoc/plugins/mamrkdown', 
            'node_moduels/angular-jsdoc/plugins/ngdoc',
          ]}
        ));
    });

3. run gulp task

    $ gulp doc
