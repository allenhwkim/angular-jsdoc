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
};
