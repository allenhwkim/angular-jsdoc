var assert = require('assert');
var jsTemplate = require(__dirname + '/../index.js');
var diff = require('diff');

var layout, data, expectedOutput, output;

/*******************************************************
 * `<%= %>` expression test
 * `<% for (...) {} %>` expression test
 *******************************************************/
layout = [
  '<div id="<%= id %>" class="<%=(i % 2 == 1 ? "even" : "")%>">',
  '  <div class="grid_1 alpha right">',
  '    <img class="righted" src="<%= profileImageUrl %>"/>',
  '  </div>',
  '  <div class="grid_6 omega contents">',
  '    <p><b><a href="/<%= fromUser %>"><%= fromUser %></a>:</b> <%= text %></p>',
  '  </div>',
  '</div>',
  '<% for (var i = 0; i < users.length; i++) { %>',
  '  <a href="<%=users[i].url%>"><%= users[i].name %></a>',
  '<% } %>',
].join("\n");

data = {
  id: 'myid',
  i: 11,
  profileImageUrl: 'myurl',
  fromUser: 'me',
  users: [{name: "John", url: "john.com"}, {name: "Jane", url: "jane.com"}]
};

expectedOutput = [
  '<div id="myid" class="even">',
  '  <div class="grid_1 alpha right">',
  '    <img class="righted" src="myurl"/>',
  '  </div>',
  '  <div class="grid_6 omega contents">',
  '    <p><b><a href="/me">me</a>:</b> </p>',
  '  </div>',
  '</div>',
  '  <a href="john.com">John</a>',
  '  <a href="jane.com">Jane</a>',
].join("\n");

output = jsTemplate(layout, data);
//console.log('diff', diff.diffLines(output, expectedOutput));
assert.equal(output.trim(), expectedOutput.trim());

/*******************************************************
 * `<%= include(filePath, data) %>` expression test
 *******************************************************/
layout = [
  '<div>',
  '  <%= include("spec/test-include.html", data) %>',
  '</div>',
].join("\n");

data = {
  users: [{name: "John", url: "john.com"}, {name: "Jane", url: "jane.com"}]
};

expectedOutput = [
  '<div>',
  '  <a href="john.com">John</a>',
  '  <a href="jane.com">Jane</a>',
  '</div>',
].join("\n");

output = jsTemplate(layout, data);
//console.log('diff', diff.diffLines(output, expectedOutput));
assert.equal(output.trim(), expectedOutput.trim());

