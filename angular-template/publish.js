/*global env: true */
'use strict';

var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var angularTemplate = require('angular-template');
var marked = require('marked');
var helper = require('jsdoc/util/templateHelper');

var templatePath;
var outdir = env.opts.destination;
var defaultModuleName = env.opts.query && env.opts.query.module;
var docFiles = env.opts.query && env.opts.query.docs.split(",");
var conf   = env.conf.templates || {}; //jshint ignore:line

var getDocletExamples = function(doclet) {
  var examples = (doclet.examples||[]).map(function(example) {
    var caption, code;

    if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
      caption = RegExp.$1;
      code  = RegExp.$3;
    }

    return {
      caption: caption || '',
      code: (code || example).replace(/</g,'&lt;')
    };
  });
  return examples;
};

// get children doclets that has member of current doclet longname
var getChildren = function(data, doclet) {
  var members  = helper.find(data, {memberof: doclet.longname});
  if (members.length === 0 && doclet.kind === 'class') {
    members  = helper.find(data, {memberof: doclet.name});
  }
  var children = {};
  members.forEach(function(doclet) {
    children[doclet.kind] = children[doclet.kind] || [];
    children[doclet.kind].push(doclet);
  });
  return children;
};

var hashToLink = function(doclet, hash) {
  if ( !/^(#.+)/.test(hash) ) {
    return hash;
  } else {
    var url = helper.createLink(doclet);
    url = url.replace(/(#.+|$)/, hash);
    return '<a href="' + url + '">' + hash + '</a>';
  }
};

var generate = function(filepath, data) {
  data.title = data.name;
  data.prettyJson = JSON.stringify(data,null,'  ');
  data.basePath = __dirname;
  data.marked = marked;

  var layoutPath = path.join(templatePath, 'html', 'layout.html');
  var html = angularTemplate(layoutPath, data, {jsMode:false});
  fs.writeFileSync(filepath, html, 'utf8');
};

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

var generateSourceFiles = function(sourceCodes, nav) {
  fs.mkPath(path.join(outdir, "source"));
  var layoutPath = path.join(templatePath, 'html', 'layout.html');

  for (var key in sourceCodes) {
    var el = sourceCodes[key];
    var sourceCode = require('fs').readFileSync(path.join(el.path, el.filename), 'utf8');
    var outputPath = path.join(outdir, "source", el.longname+".html");
    var data = {
      name: el.name,
      longname: el.longname,
      path: el.path,
      filename: el.filename,
      code: sourceCode.replace(/</g,'&lt;'),
      nav: nav,
      basePath: __dirname,
      title: "source : "+el.filename
    };
    var html = angularTemplate(layoutPath, data);
    fs.writeFileSync(outputPath, html, 'utf8');
  }
};

var generateTemplateFiles = function(templateCodes, nav) {
  fs.mkPath(path.join(outdir, "templates"));

  for (var key in templateCodes) {
    var el = templateCodes[key];
    if (fs.existsSync(el.filePath)) {
      var templateHtml = require('fs').readFileSync(el.filePath, 'utf8');
      var outputPath = path.join(outdir, "templates", el.outputName);
      var data = {
        name: el.name,
        longname: el.longname,
        path: el.filePath,
        code: templateHtml.replace(/</g,'&lt;'),
        nav: nav,
        basePath: __dirname,
        title: "template : "+el.templateUrl
      };

      var layoutPath = path.join(templatePath, 'html', 'layout.html');
      var html = angularTemplate(layoutPath, data);
      fs.writeFileSync(outputPath, html, 'utf8');
    }
  }
};

var generateStaticDocuments = function(docs, nav) {
  fs.mkPath(path.join(outdir, "docs"));

  (docs||[]).forEach(function(el) {
    var outputPath = path.join(outdir, el+".html");
    var markdown = require('fs').readFileSync(el, 'utf8');
    var documentData = {
      nav: nav,
      readme: marked(markdown),
      basePath: __dirname,
      title: el,
    };

    var layoutPath = path.join(templatePath, 'html', 'layout.html');
    var html = angularTemplate(layoutPath, documentData);
    fs.writeFileSync(outputPath, html, 'utf8');
  });
};

/**
  @param {TAFFY} taffyData See <http://taffydb.com/>.
  @param {object} opts
 */
exports.publish = function(data, opts) {
  //console.log('options', opts);
  data.sort('longname, version, since');

  templatePath = opts.template;

  var classes  = helper.find(data, {kind: 'class'});
  var sourceCodes = {}, templateCodes = {};

  classes.forEach(function(doclet) {

    if (doclet.meta && doclet.kind == 'class') {
      sourceCodes[doclet.name] = {
        name: doclet.name,
        longname: doclet.longname,
        path: doclet.meta.path,
        filename: doclet.meta.filename
      };
    }

    if (doclet.ngdoc == 'directive') {
      var code = fs.readFileSync(
        path.join(doclet.meta.path, doclet.meta.filename), 'utf8');
      var matches = code.match(/templateUrl\s*:\s* (.*)/);
      var templateUrl = matches && matches[1];
      if (templateUrl && templateUrl.indexOf('function') === -1) {
        templateUrl = templateUrl.trim().replace(/['",]/g,'');
        var templatePath = templateUrl;
        var templateCode =  {
          name: doclet.name,
          longname: doclet.longname,
          filePath: templatePath,
          templateUrl: templateUrl,
          outputName: templateUrl.replace(/[\/\\]/g,'_')
        };
        doclet.templateCode = templateCode;
        doclet.templateUrl = path.join('templates', templateCode.outputName);
        templateCodes[doclet.name] = templateCode;
      }
    }

  });

  data().each(function(doclet) {
    doclet.children = getChildren(data, doclet);
    doclet.examples = getDocletExamples(doclet);
    doclet.jsDocUrl = helper.createLink(doclet);

    if (doclet.meta) {
      if (doclet.kind == 'class') {
        doclet.sourceUrl = 'source/'+
          sourceCodes[doclet.name].longname+
          ".html#line"+doclet.meta.lineno;
      } else if ( (doclet.kind == 'function' || doclet.kind == 'member') &&
        sourceCodes[doclet.memberof]) {
        doclet.sourceUrl = 'source/'+
          sourceCodes[doclet.memberof].longname+
          ".html#line"+doclet.meta.lineno;
      }
    }

    if (doclet.see) {
      doclet.see.forEach(function(seeItem, i) {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }
  });

  // build navigation
  var nav = {
    docs: docFiles || [],
    module: {}
  };
  classes.forEach(function(doclet) {
    var module = doclet.memberof || defaultModuleName;
    var group = doclet.ngdoc || 'undefined';
    nav.module[module] = nav.module[module] || {};
    nav.module[module][group] = nav.module[module][group] || {};
    nav.module[module][group][doclet.name] = {jsDocUrl: doclet.jsDocUrl};
  });

  // generate source html files
  copyStaticFiles();                         // copy static files e.g., css, js
  generateSourceFiles(sourceCodes, nav);     // generate source file as html
  generateTemplateFiles(templateCodes, nav); // generate template file for directives
  generateStaticDocuments(docFiles, nav);    // generate static documents

  // generate jsdoc html files
  classes.forEach(function(doclet) {
    var jsDocPath = doclet.jsDocUrl.replace(/#.*$/,'');
    var outputPath = path.join(outdir, jsDocPath);
    doclet.nav = nav;
    generate(outputPath, doclet);
  });

  // generate index.html
  if (opts.readme) {
    var layoutPath = path.join(templatePath, 'html', 'layout.html');
    var readmeData = {
      nav: nav,
      readme: opts.readme,
      basePath: __dirname,
      title: "Index"
    };
    var html = angularTemplate(layoutPath, readmeData, {jsMode:false});
    fs.writeFileSync(path.join(outdir, 'index.html'), html, 'utf8');
  }
};
