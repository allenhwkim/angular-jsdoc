Angular Template
----------------

  This template is written in `angular-template`, and it is used when template name is given `angular-template` as an option.

  To generate with this template, set template option to `node_modules/angular-jsdoc/angular-template`. e.g.;

    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/angular-template \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

  Files

    angular-template
      ├── css                 # css used in layout.html
      ├── js                  # javascript used in layout.html
      ├── fonts               # font used in layout.html
      ├── html
      │   ├── class.html      # class layout written in angular-template
      │   └── layout.html     # layout written in angular-template
      └── publish.js          # the main file that generate jsdoc
