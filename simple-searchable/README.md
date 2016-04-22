Documentation Template
----------------
  This is the custom template for method documentation.

  To generate with this template, set template option in `tasks/documentation.js`:

```
    'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/common/conf.json '+  
    '-t docs/documentation-template '+                  // template file
    '-d docs/methods '+                                 
    './README.md ' +                                    
    '-r app/scripts docs/tutorials '  +
    '-u docs/tutorials'                              
```

  Files
```
    documentation-template
      ├── css                 # css used in layout.html
      ├── js                  # javascript used in layout.html
      ├── fonts               # font used in layout.html
      ├── html
      │   ├── class.html      # class layout written in angular-template
      │   └── layout.html     # layout written in angular-template
      └── publish.js          # the main file that generate jsdoc
```