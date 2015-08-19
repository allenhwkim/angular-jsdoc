# js-template
Rewritten and Improved John Resig's micro javascipt template

js-template is based on John Resig's microTemplate function. However the orinal version has got to be improved.

  - No more error with single quote
  - Better error message handling wth line number
  - No more scrambled output by keeping white spaces as it is
  - Less undefined variable errors
  - include feature. e.g. include('partial.html', data)

Install
-------

    npm install js-template

Example
--------

    var jsTemplate = require('js-template');
    var templateHtml = "Hello <b><%= world %></b>";
    var data = {world: "You!!"};
    var output = jsTemplate(templateHrml, data);
    console.log(output); // Hello <b>You!!</b>

#### template1

    <div id="<%= id %>" class="<%=(i % 2 == 1 ? "even" : "")%>">'
      <div class="grid_1 alpha right">
        <img class="righted" src="<%= profileImageUrl %>"/>
      </div>
      <div class="grid_6 omega contents">
        <a href="/<%= fromUser %>"><%= fromUser %></a>
      </div>
    </div>
    <% for (var i = 0; i < users.length; i++) { %>
      <a href="<%=users[i].url%>"><%= users[i].name %></a>
    <% } %>

#### data1

    {
      id: 'myid',
      i: 11,
      profileImageUrl: 'myurl',
      fromUser: 'me',
      users: [
        {name: "John", url: "john.com"},
        {name: "Jane", url: "jane.com"}
      ]
    };

#### jsTemplate(template1, data1)

    <div id="myid" class="even">
      <div class="grid_1 alpha right">
        <img class="righted" src="myurl"/>
      </div>
      <div class="grid_6 omega contents">
        <a href="/me">me</a>:</b>
      </div>
    </div>
      <a href="john.com">John</a>
      <a href="jane.com">Jane</a>

#### template2

    <div>
      <%= include("spec/test-include.html", data) %>
    </div>

#### data2

    {
      users: [
        {name: "John", url: "john.com"},
        {name: "Jane", url: "jane.com"}
      ]
    };

#### jsTemplate(template2, data2)

    <div>
      <a href="john.com">John</a>
      <a href="jane.com">Jane</a>
    </div>
