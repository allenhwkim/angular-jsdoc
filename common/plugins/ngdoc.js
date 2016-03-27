exports.defineTags = function(dictionary) {
  dictionary.defineTag('ngdoc', {
    mustHaveValue: true,
    onTagged : function(doclet, tag) {
      if (tag.value == "method") {
        doclet.addTag('kind', 'function');
      } else {
        doclet.addTag('kind', 'class');
      }
      doclet.ngdoc = tag.value;
    }
  });

  dictionary.defineTag('attribute', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: function(doclet, tag) {
      doclet.attributes = parseParamTypes(doclet.attributes, tag);
    }
  })
  .synonym('attr');

  dictionary.defineTag('param', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: function(doclet, tag) {
      doclet.params = parseParamTypes(doclet.params, tag);
    }
  });

  dictionary.defineTag('property', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: function(doclet, tag) {
      doclet.properties = parseParamTypes(doclet.properties, tag);
    }
  });

  dictionary.defineTag('returns', {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: false,
    onTagged: function(doclet, tag) {
      var returnsText = new RegExp(/@returns (\{.*\}.*)/).exec(doclet.comment);

      if (returnsText) {
        tag.text = returnsText[1];
        doclet.returns = parseParamTypes(doclet.returns, tag);
      }
    }
  });

  dictionary.defineTag('restrict', {
    mustHaveValue: true,
    onTagged: function(doclet, tag) {
      var restricts={
          'A': 'Attribute',
          'E': 'Element',
          'C': 'Class'
      }
      var s = tag.value.split('').map(function(aec) {
        return restricts[aec];
      })
      doclet.restrict = s;
    }
  });

  dictionary.defineTag('priority', {
    mustHaveValue: true,
    onTagged: function(doclet, tag) {
      doclet.priority = tag.value;
    }
  });

  dictionary.defineTag('eventType', {
    mustHaveValue: true,
    onTagged: function(doclet, tag) {
      doclet.eventType = tag.value;
    }
  });

  dictionary.defineTag('animations', {
    mustHaveValue: true,
    onTagged: function(doclet, tag) {
      doclet.animations = tag.value;
    }
  });

  dictionary.defineTag('scope', {
    onTagged: function (doclet, tag) {
      var scopeType = {
        'object': 'Isolated Scope',
        '{}': 'Isolated Scope',
        'true': 'Child Scope',
        'false': 'Shared Scope'
      };

      if (!scopeType.hasOwnProperty(tag.value)) {
        doclet.directiveScope = 'New Scope';
      } else {
        doclet.directiveScope = scopeType[tag.value];
      }
    }
  });
};

function parseParamTypes(docletParams, tag) {
  if (!docletParams) {
    docletParams = [];
  }

  var result = {
    name: tag.value.name,
    description: tag.value.description
  };

  var defaultTypes = ['boolean', 'string', 'expression', '*', 'mixed', 'number', 'null', 'undefined', 'function',
    '{}', 'object', '[]', 'array', 'void'];
  var defaultTypeStarts = ['\'', '"', '[', '{'];

  var typeDoc = new RegExp(/\{(.*?)\}/).exec(tag.text);

  if (!typeDoc) {
    result.typeDefinition =  '*';
    docletParams.push(result);
    return;
  }

  var types = typeDoc[1].split('|');
  var typeRegex = new RegExp(/(.*?)(\[\])?$/);

  var parseTypeDefinitionUrl = '';
  var parseTypeDefinition = '';
  var i = 0;
  for (; i < types.length; i++) {
    var type = typeRegex.exec(types[i]);

    if (i > 0) {
      parseTypeDefinitionUrl += '|';
      parseTypeDefinition += '|';
    }

    if (defaultTypes.indexOf(type[1].toLowerCase()) !== -1 || defaultTypeStarts.indexOf(type[1][0]) !== -1) {
      parseTypeDefinitionUrl += type[1] + (type[2] || '');
    } else {
      parseTypeDefinitionUrl += '<a href="' + type[1] + '.html">' + type[1] + (type[2] || '') + '</a>';
    }

    parseTypeDefinition += type[1] + (type[2] || '');
  }

  result.typeDefinitionUrl = parseTypeDefinitionUrl;
  result.typeDefinition = parseTypeDefinition;
  docletParams.push(result);

  return docletParams;
}
