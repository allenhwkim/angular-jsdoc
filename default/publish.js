/*global env: true */
'use strict';

var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var jsTemplate = require('js-template');
var marked = require('marked');

var helper = require('jsdoc/util/templateHelper');

var templatePath;
var outdir = env.opts.destination;
var defaultModuleName = env.opts.query && env.opts.query.module;
var docFiles = env.opts.query && env.opts.query.docs.split(",");
var conf   = env.conf.templates || {}; //jshint ignore:line
var toc    = {}; //table of contents

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

var getPathFromDoclet = function(doclet) {
  if (!doclet.meta) {
    return null;
  } else if (doclet.meta.path && doclet.meta.path !== 'null') {
    return path.join(doclet.meta.path, doclet.meta.filename);
  } else {
    return doclet.meta.filename;
  }
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
  data.title = data.ngdoc + ":" + data.longname;
  data.prettyJson = JSON.stringify(data,null,'  ');
  data.basePath = __dirname;
  data.marked = marked;

  var layoutPath = path.join(templatePath, 'html', 'layout.html');
  var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
  var html = jsTemplate(layoutHtml, data);
  fs.writeFileSync(filepath, html, 'utf8');
};

var generateSourceFiles = function(sourceFiles, nav) {
  fs.mkPath(path.join(outdir, "source"));
  var layoutPath = path.join(templatePath, 'html', 'layout.html');
  var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
  for(var jsDoc in sourceFiles) {
    var source = sourceFiles[jsDoc];
    var sourceCode = require('fs').readFileSync(source.path, 'utf8');
    sourceCode = sourceCode.replace(/</g,"&lt;");
    var data = {
      path: source.path,
      code: sourceCode,
      nav: nav,
      basePath: __dirname,
      title: "Source:"+source.path.replace(/^.*[\/\\]/,'')
    };
    var outputPath = path.join(outdir, "source", jsDoc);
    var html = jsTemplate(layoutHtml, data);
    fs.writeFileSync(outputPath, html, 'utf8');
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
    var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
    var html = jsTemplate(layoutHtml, documentData);
    fs.writeFileSync(outputPath, html, 'utf8');
  });
};

var generateTutorialFile = function(title, tutorial, filename) {
  var tutorialData = {
    title: title,
    header: tutorial.title,
    content: tutorial.parse(),
    children: tutorial.children
  };

  var tutorialPath = path.join(outdir, filename);
  var tutoriallink = function (tutorial) {
    return helper.toTutorial(tutorial, null,
      { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
  };

  var layoutPath = path.join(templatePath, 'html', 'tutorial.html');
  var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
  var html = jsTemplate(layoutHtml, {
    basePath: __dirname,
    tutorialData: tutorialData,
    tutoriallink: tutoriallink
  });
  // yes, you can use {@link} in tutorials too!
  // turn {@link foo} into <a href="foodoc.html">foo</a>
  html = helper.resolveLinks(html);
  fs.writeFileSync(tutorialPath, html, 'utf8');
};

var generateTutorialFiles = function(node) {
  fs.mkPath(path.join(outdir, "tutorials"));

  node.children.forEach(function(child) {
    generateTutorialFile(
        'Tutorial: ' + child.title,
        child,
        helper.tutorialToUrl(child.name)
      );

    generateTutorialFiles(child);
  });
};

/**
  @param {TAFFY} taffyData See <http://taffydb.com/>.
  @param {object} opts
 */
exports.publish = function(data, opts, tutorials) {
  helper.setTutorials(tutorials);
  data.sort('longname, version, since');

  templatePath = opts.template;
  var sourceFiles = {};

  data().each(function(doclet) {
    doclet.children = getChildren(data, doclet);
    doclet.examples = getDocletExamples(doclet);

    doclet.jsDocUrl = helper.createLink(doclet);
    doclet.tutoriallink = function (tutorial) {
      return helper.toTutorial(tutorial, null,
        { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
    };

    if (doclet.meta) {
      var sourceHtml = doclet.jsDocUrl.replace(/#.*$/,'');
      doclet.sourceUrl = 'source/'+sourceHtml+"#line"+doclet.meta.lineno;
      if (doclet.kind == 'class') {
        sourceFiles[sourceHtml] = {
          path: getPathFromDoclet(doclet),
          toc: toc
        };
      }
    }

    if (doclet.see) {
      doclet.see.forEach(function(seeItem, i) {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }
  });

  var classes  = helper.find(data, {kind: 'class'});

  // build navigation
  var nav = {
    docs: docFiles || [],
  };
  classes.forEach(function(doclet) {
    var module = doclet.memberof || defaultModuleName;
    var group = doclet.ngdoc || 'undefined';
    nav[module] = nav[module] || {};
    nav[module][group] = nav[module][group] || {};
    nav[module][group][doclet.longname] = {jsDocUrl: doclet.jsDocUrl};
  });

  // generate source html files
  copyStaticFiles();                     //copy static files e.g., css, js
  generateSourceFiles(sourceFiles, nav); //generate source file as html
  // generate static documents from env.opts.query.docs
  generateStaticDocuments(docFiles, nav);
  // generate tutorial files
  generateTutorialFiles(tutorials);

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
    var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
    var readmeData = {
      nav: nav,
      readme: opts.readme,
      basePath: __dirname,
      title: "Index"
    };
    var html = jsTemplate(layoutHtml, readmeData);
    fs.writeFileSync(path.join(outdir, 'index.html'), html, 'utf8');
  }
};
