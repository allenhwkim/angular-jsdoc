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
    onTagged: function(doclet, tag) {
      var scopeType={
        'object': '\'isolate\' scope',
        '{}': '\'isolate\' scope',
        'true': 'scope which prototypically inherits from its parent',
        'false': 'shared scope'
      }
      var s = function() {
        return scopeType[tag.value];
      }();
      if (!tag.value || !s) {
        doclet.scopeType = 'scope';
      } else {
        doclet.scopeType = s;
      }
      doclet.newScope = !(s == 'shared scope');
    }
  });
};

function parseParamTypes(docletParams, tag) {
  if (!docletParams) {
    docletParams = [];
  }

  var defaultTypes = ['boolean', 'string', 'expression', '*', 'mixed', 'number', 'null', 'undefined', 'function',
    '{}', 'object', '[]', 'array', 'void'];
  var defaultTypeStarts = ['\'', '"', '[', '{'];

  var typeRegex = new RegExp(/\{(.*?[^\[\]])?(\[\])?\}.*?/);
  var matches = typeRegex.exec(tag.text);

  var types = matches[1].split('|');
  matches[2] = (matches[2] || '');
  var parsedTypeDefinition = '';

  var i = 0;
  for (; i < types.length; i++) {
    var type = types[i];

    if (i > 0) {
      parsedTypeDefinition += '|';
    }

    if (defaultTypes.indexOf(type) !== -1 || defaultTypeStarts.indexOf(type[0]) !== -1) {
      parsedTypeDefinition += type + matches[2];
    } else {
      parsedTypeDefinition += '<a href="' + matches[1] + '.html">' + matches[1] + matches[2] + '</a>';
    }
  }

  docletParams.push({
    typeDefinition: parsedTypeDefinition,
    name: tag.value.name,
    description: tag.value.description
  });

  return docletParams;
}
