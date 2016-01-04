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
      if (!doclet.attributes) { doclet.attributes = []; }
      doclet.attributes.push(tag.value);
    }
  })
  .synonym('attr');

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
