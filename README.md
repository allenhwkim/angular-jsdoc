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

If you intend to use it with Grunt also execute:

    $ npm install grunt-jsdoc --save-dev

Quick Start
-----------

### With Command Line

    // or you can run in command line
    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/angular-template \
      --destination build/docs \
      --readme README.md \
      --recurse directives services
      --tutorials tutorials

### Or, With Gulp

    var shell = require('gulp-shell');
    gulp.task('docs', shell.task([
      'node_modules/jsdoc/jsdoc.js '+
        '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
        '-t node_modules/angular-jsdoc/angular-template '+   // template file
        '-d build/docs '+                           // output directory
        './README.md ' +                            // to include README.md as index contents
        '-r directives services'  +                 // source code directory
        '-u tutorials'                              // tutorials directory
    ]));

### Or, With Grunt

    grunt.initConfig({
      jsdoc: {
        dist: {
          src: ['directives', 'services'],
          options: {
            destination: 'build/docs',
            configure: 'node_modules/angular-jsdoc/common/conf.json',
            template: 'node_modules/angular-jsdoc/angular-template',
            tutorial: 'tutorials',
            readme: './README.md'
          }
        }
      }
    });


Tags Available
--------
- `@ngdoc` - specifies the type of thing being documented. See below for more detail.
- `@scope` - specifies the type of scope used by documented directive. Options are `true` for a new inherited
scope, `false` for shared scope, and either `{}` or `object` for isolate scope. if `@scope` is provided without
  a value, a new shared scope will be assumed
- `@priority` - specifies the documented directive's priority
- `@animations` - specifies the animations that the documented directive supports
- `@restrict` - specifies how directives should be shown in the usage section. For example, for [E]lement, [A]ttribute, and [C]lass, use @restrict ECA
- `@eventType emit|broadcast` - specifies whether the event is emitted or broadcast

Example
--------

   - Directive: [map.js](sample-codes/ngmap/map.js) |
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/angular-template/docs/ngmap.map.html)
   - Service: [attr2-options.js](sample-codes/ngmap/attr2-options.js) |
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/angular-template/docs/ngmap.Attr2Options.html)
   - Controller: [map-controller.js](sample-codes/ngmap/map-controller.js) |
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/angular-template/docs/ngmap.MapController.html)
   - Filter: [custom-currency.js](sample-codes/app/custom-currency.js) |
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/angular-template/docs/app.customCurrency.html)

Customization
-------------

Currently, there are two templates built-in;

  - default
  - angular-template (Recommended)

To add your own template, please copy the `angular-template` directory to your own, then, make your own css, js, and html files.   
Then, run the `jsdoc.js` command with your template. e.g.,

    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/my-template \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

If you want to share your template with others, please send a pull request after adding your template directory where `angular-template` directory is.

The following is the example of directory with explanation:

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


Currently the default angular-template does not come with custom fonts. If you would like to use a template like angular-template but with custom fonts, change the `copyStaticFiles` method in your publish.js:

__angular-template/publish.js__
```js
// copy the template's static files to outdir
var copyStaticFiles = function() {
  ['css', 'js'].forEach(function(dirName) {
    var fromDir = path.join(templatePath, dirName);
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function(fileName) {
      var toDir = fs.toDir( fileName.replace(fromDir, path.join(outdir, dirName)) );
      fs.mkPath(toDir);
      fs.copyFileSync(fileName, toDir);
    });
  });
};
```

to:

__my-template/publish.js__
```js
// copy the template's static files to outdir
var copyStaticFiles = function() {
  ['css', 'js', 'fonts'].forEach(function(dirName) {
    var fromDir = path.join(templatePath, dirName);
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function(fileName) {
      var toDir = fs.toDir( fileName.replace(fromDir, path.join(outdir, dirName)) );
      fs.mkPath(toDir);
      fs.copyFileSync(fileName, toDir);
    });
  });
};
```

Copyright
--------
  MIT licence
