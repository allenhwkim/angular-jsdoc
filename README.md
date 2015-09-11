Angular-JSDoc
=============

JSDoc 3 Template for AngularJS.  
A JSDoc plugin and template for AngularJS, nothing else!  

NOTE: the location of configure file and template directory has been moved with the release of 1.0.0
 Please make changes accordingly for your gulp file.

   - configure: Old: `node_modules/angular-jsdoc/conf.json`  New: `node_modules/angular-jsdoc/common/conf.json`
   - template:  Old: `node_modules/angular-jsdoc/template`   New: `node_modules/angular-jsdoc/default`

Blog: [Sigh, AngularJS Documentation](http://allenhwkim.tumblr.com/post/92161523693/sigh-angularjs-documentation)

<img src=http://i.imgur.com/FPo9x25.gif width=50%  />

Features
----------
  * Right side TOC, table of contents,  for navigation by Directives, Services, Controllers, etc
  * Read and process @ngdoc tag

How Does It Look Like?
------------------------
  * [angularjs-google-maps Documentation](https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/docs/index.html)


Install
-------

    $ npm install jsdoc angular-jsdoc --save-dev

Quick Start
-----------

### With Command Line

    // or you can run in command line
    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/default \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

### Or, With Gulp

    var shell = require('gulp-shell');
    gulp.task('docs', shell.task([
      'node_modules/jsdoc/jsdoc.js '+
        '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
        '-t node_modules/angular-jsdoc/angular-template '+   // template file
        '-d build/docs '+                           // output directory
        './README.md ' +                            // to include README.md as index contents
        '-r directives services'                    // source code directory
    ]));

### Or, With Grunt

    grunt.initConfig({
      jsdoc : {
        dist: {
          src: ['directives', 'services'],
          options: {
            destination: 'build/docs',
            configure: 'node_modules/angular-jsdoc/common/conf.json',
            template: 'node_modules/angular-jsdoc/angular-template',
            readme: './README.md'
          }
        }
      }
    });

### Or, With NodeJS

    var angularJsdoc = require('angular-jsdoc');
    angularJsdoc(['my-source1', 'my-source2']);


    // or with options
    angularJsdoc('sample-codes', {
      template: 'default',
      destination: 'default/docs',
      readme: "sample-codes/README.md"
    }, function(output) {
      console.log('output', output);
    });


Specification
--------------

  angularJsdoc(sourceDirectory, options, callback)

  - sourceDirectory: list of source code directories. e.g. ['dir1', 'dir2']

  - options:

    - command: jsdoc.js command
                 Default: node_modules/jsdoc/jsdoc.js
    - configure: The path to the configuration file.
                 Default: angular-jsdoc/common/conf.json
    - destination: The path to the output folder. 
                 Default: ./docs
    - template:  The path to the template to use
                 Default: angular-jsdoc/default
    - readme: The path to the project's README file.
                 Default: 'README.md'
  - callback: callback function with output parameter. e.g., `function(output) {console.log(output)}`

Example
--------

   - Directive: [map.js](sample-codes/ngmap/map.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.map.html)
   - Service: [attr2-options.js](sample-codes/ngmap/attr2-options.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.Attr2Options.html)
   - Controller: [map-controller.js](sample-codes/ngmap/map-controller.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.MapController.html)
   - Filter: [custom-currency.js](sample-codes/app/custom-currency.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/app.customCurrency.html)

Customization
-------------

Currently, there are two templates built-in;

  - default
  - angular-template

To add your own template, please copy the default directory to your own, then, make your own css, js, and html files.   
Then, run the `jsdoc.js` command with your template. e.g.,

    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/my-template \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

If you want to share your template with others, please send a pull request after adding your template directory where `default` directory is.

The following is the example of directory with explanation;


    my-template
      ├── css
      │   └── my.css          # css used in layout.html
      ├── js
      │   └── my.js           # javascript used in layout.html
      ├── fonts
      │   └── my.woff         # font used in layout.html
      ├── html
      │   ├── class.html      # template used by layout.html
      │   └── layout.html     # layout file
      └── publish.js          # the main file that generate jsdoc


Copyright
--------
  MIT licence
