Angular-JSDoc
=============

JSDoc 3 Template for AngularJS.  
A JSDoc plugin and template for AngularJS, nothing else!  

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

    var angularJsdoc = require('angualr-jsdoc');
    angularJsdoc(['my-source1', 'my-source2']); 


    // or with options
    angularJsdoc('sample-codes', {
      template: 'default',
      destination: 'default/docs',
      readme: "sample-codes/README.md"
    });

Specification
--------------

  angularJsdoc(sourceDirectory, options)

  - sourceDirectory: list of source code directories. e.g. ['dir1', 'dir2']

  - options:

    - configure: The path to the configuration file.
                 Default: angular-jsdoc/common/conf.json
    - destination: The path to the output folder. 
                 Default: ./docs
    - template:  The path to the template to use
                 Default: angular-jsdoc/default
    - readme: The path to the project's README file.
                 Default: 'README.md'

Example
--------

   - Directive: [map.js](sample-codes/ngmap/map.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.map.html)
   - Service: [attr2-options.js](sample-codes/ngmap/attr2-options.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.Attr2Options.html)
   - Controller: [map-controller.js](sample-codes/ngmap/map-controller.js) | 
     [Output](https://rawgit.com/allenhwkim/angular-jsdoc/master/default/docs/ngmap.MapController.html)

Customization
-------------
To make your own template, please copy the default directory to your own, then, make your own css, js, and html files. Then, run angularJsdoc with your own template. e.g., `angularJsDoc({template:'myown'})`

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
