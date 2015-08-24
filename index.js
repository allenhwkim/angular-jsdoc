'use strict';

var spawn = require('child_process').spawn;
var extend = require('util')._extend;
var path = require('path');
var Q = require('q');

/**
 * execute shell command
 */
var runCommand = function(cmd, args) {
  var deferred = Q.defer();

  console.log("angularJsdoc Running command\n", cmd, args.join(" "));
  var child = spawn(cmd,args), result="";
  child.stdout.on("data", function(data) {
    result += data; 
  });
  child.stderr.on("data", function(data) {result += data;});
  child.stdout.on("end",  function() {deferred.resolve(result);});

  return deferred.promise;
};

/**
 * main function
 */
var angularJsdoc = function(dirs, optionsArg, callback) {
  optionsArg = optionsArg || {};
  dirs = Array.isArray(dirs) ? dirs : dirs.split(" ");
  //default values
  var command = 
    optionsArg.command || path.join("node_modules", "jsdoc", "jsdoc.js");
  var options = extend({
      configure: path.join(__dirname, "common", "conf.json"),
      template: path.join(__dirname, "default"),
      destination: "docs",
      readme: 'README.md'
    }, optionsArg); 
  // if given template a single word including dash
  if (optionsArg.template && optionsArg.template.match(/^[\w-]+$/i)) {
    options.template = path.join(__dirname, optionsArg.template);
  };

  var args = [
    '--configure', options.configure,
    '--template', options.template,
    '--destination', options.destination,
    '--readme', options.readme
  ];
  args = args.concat(['--recurse']).concat(dirs);
  runCommand(command, args).then(function(output) {
    callback && callback(output);
  });
};

module.exports = angularJsdoc;

