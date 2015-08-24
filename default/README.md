Default Template
----------------

  This template is used when no template name is given as an option.

  To generate with this template, set template option to `node_modules/angular-jsdoc/default`. e.g.;

    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/default \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

  Files

    defalult
      ├── css                 # css used in layout.html
      ├── js                  # javascript used in layout.html
      ├── fonts               # font used in layout.html
      ├── html
      │   ├── class.html      # class layout written in js-template
      │   └── layout.html     # layout written in js-template
      └── publish.js          # the main file that generate jsdoc

