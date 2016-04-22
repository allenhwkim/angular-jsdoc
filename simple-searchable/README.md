Simple Searchable Template
----------------

  This template is written in `simple-searchable`, and it is used when template name is given `simple-searchable` as an option.

  It is similiar to 'angular-template', with a change of styles, and including a search box to filter navigation items. 

  To see what it looks like, open simple-searchable/docs/index.html in your browser.

  To generate with this template, set template option to `node_modules/angular-jsdoc/simple-searchable`. e.g.;

    $ node_modules/jsdoc/jsdoc.js \
      --configure node_modules/angular-jsdoc/common/conf.json \
      --template node_modules/angular-jsdoc/simple-searchable \
      --destination build/docs \
      --readme README.md \
      --recurse directives services

  Files

    simple-searchable
      ├── css                 # css used in layout.html
      ├── js                  # javascript used in layout.html
      ├── html
      │   ├── class.html      # class layout written in angular-template
      │   └── layout.html     # layout written in angular-template
      └── publish.js          # the main file that generate jsdoc