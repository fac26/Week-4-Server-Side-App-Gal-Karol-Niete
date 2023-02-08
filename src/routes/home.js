const { layout, Home } = require("../templates/template");

//sign in page / home route

function get(request, response) {
  const content = Home();
  const title = "I love foods!";
  const body = layout({ title, content });
  response.send(body);
}

module.exports = { get };
