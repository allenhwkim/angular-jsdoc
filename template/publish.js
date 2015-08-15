/*global env: true */
'use strict';

var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var jsTemplate = require('js-template');

var helper = require('jsdoc/util/templateHelper');
//helper.toTutorial(tutorial, null, options)
//helper.getAncestorLinks(data, docket)
//helper.createLink(doclet)
//helper.getAttribs(data)
//helper.getUniqueFilename(str)
//helper.htmlsafe(str)
//helper.getAncestors(data, doclet)
//helper.prune(data)
//helper.resolveAuthorLinks;
//helper.scopeToPunc;

var templatePath;
var outdir = env.opts.destination;
var conf   = env.conf.templates || {};
var toc    = {}; //table of contents
console.log('env.opts:', env.opts, 'conf:', conf);

var getDocletExamples = function(doclet) {
  var examples = (doclet.examples||[]).map(function(example) {
    var caption, code;

    if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
      caption = RegExp.$1;
      code  = RegExp.$3;
    }

    return {
      caption: caption || '',
      code: code || example
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
  ['css','js'].forEach(function(dirName) {
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
  data.prettyJson = JSON.stringify(data,null,'  ');

  var layoutPath = path.join(templatePath, 'html', 'layout.html');
  var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
  var html = jsTemplate(layoutHtml, data);
  fs.writeFileSync(filepath, html, 'utf8');
};

var generateSourceFiles = function(sourceFiles) {
  fs.mkPath(path.join(outdir, "source"));
  var layoutPath = path.join(templatePath, 'html', 'source.html');
  var layoutHtml = require('fs').readFileSync(layoutPath, 'utf8');
  for(var jsDoc in sourceFiles) {
    var source = sourceFiles[jsDoc];
    var sourceCode = require('fs').readFileSync(source.path, 'utf8');
    sourceCode = sourceCode.replace(/</g,"&lt;");
    var lineNumbers = sourceCode.split("\n").map(function(el,i) {
      return i+1;
    }); //jshint ignore:line
    var data = {
      path: source.path,
      code: sourceCode,
      toc: toc,
      lineNumbers: lineNumbers
    };
    var outputPath = path.join(outdir, "source", jsDoc);
    var html = jsTemplate(layoutHtml, data);
    fs.writeFileSync(outputPath, html, 'utf8');
  }
};

/**
  @param {TAFFY} taffyData See <http://taffydb.com/>.
  @param {object} opts
 */
exports.publish = function(data, opts) {
  //data = helper.prune(data); //remove members that won't be in documentation
  data.sort('longname, version, since');

  templatePath = opts.template;
  var sourceFiles = {};

  data().each(function(doclet) {
    //console.log('doclet.longname', doclet.longname + "("+doclet.kind+")");
    doclet.children = getChildren(data, doclet);
    doclet.examples = getDocletExamples(doclet);

    doclet.jsDocUrl = helper.createLink(doclet);
    if (doclet.meta) {
      var sourceHtml = doclet.jsDocUrl.replace(/#.*$/,'');
      doclet.sourceUrl = 'source/'+sourceHtml+"#line"+doclet.meta.lineno;
      sourceFiles[sourceHtml] = {
        path: getPathFromDoclet(doclet),
        toc: toc
      };
    }
    //console.log(" .....  ", doclet.longname, doclet.sourceUrl);

    if (doclet.see) {
      doclet.see.forEach(function(seeItem, i) {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }

  });
  //console.log('sourceFiles', sourceFiles);

  copyStaticFiles();                //copy static files e.g., css, js
  generateSourceFiles(sourceFiles); //generate source file as html

  // generate jsDoc html files
  var classes  = helper.find(data, {kind: 'class'});
  classes.forEach(function(doclet) {
    var jsDocPath = doclet.jsDocUrl.replace(/#.*$/,'');
    var outputPath = path.join(outdir, jsDocPath);
    //console.log('outputPath', outputPath);
    generate(outputPath, doclet);
  });

};
