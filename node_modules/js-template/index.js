'use strict';
var fs = require('fs');
var templateCache = {}; //cache by template

var getLineNoAdded = function(str) {
  return str.split("\n").map(function(line, i) {
    return "<% LINE("+(i+1)+"); %>" + line;
  }).join("\n");
};

var setWhiteSpaces = function(str, set) {
  if (set) { //replace white spaces to special characters
    return str.replace(/[\r]/g, "::BR::")
      .replace(/[\n]/g, "::BN::")
      .replace(/[\t]/g, "::BT::");
  } else {   // restore white spaces and remove empty lines
    return str.replace(/::BR::/g, "\r")
      .replace(/::BN::/g, "\n")
      .replace(/::BT::/g, "\t")
      .replace(/^\s*[\r\n]/gm, "").trim();
  }
};

var addUndefinedCheck = function(str) {
  return str.replace(/<%\s*if\s*\(\s*([a-z_]+)\s*\)/gi, "<% if (typeof $1 !== 'undefined')")
    .replace(/<%=\s*([a-z_]+)\s*%>/gi, "<%= typeof $1 == 'undefined' ? '' : $1 %>");
};

var templateFunc = function(str) {
  str = getLineNoAdded(str);
  str = setWhiteSpaces(str, true);
  str = addUndefinedCheck(str);

  var func = templateCache[str];
  if (!func) {
    var strFunc = [
      'var lineNo;',
      'try{',
        'var p=[];',
        'var LINE=function(no){lineNo=no};',
        "with(data){p.push('" ,
          str.replace(/'(?=[^%]*%>)/g, "\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "',$1,'")
            .split("<%").join("');")
            .split("%>").join("p.push('"),
      "  ');}",
      "  return p.join('');",
      '}catch(e){',
      '  e.lineNo = lineNo;',
      '  throw e;',
      '}'
    ].join('');
    func = new Function("data", strFunc);
    templateCache[str] = func;
  }
  return func;
};

var jsTemplate = function(str, data) {
  fs.existsSync(str) && (str = fs.readFileSync(str, 'utf8'));
  data.include = jsTemplate;  // include(path, data) function
  var template = templateFunc(str);
  try {
    var output = template(data);
    output = setWhiteSpaces(output, false);
    return output;
  } catch(e) {
    console.log("jsTemplate error in line", e.lineNo);
    throw e;
  }
};

module.exports = jsTemplate;
