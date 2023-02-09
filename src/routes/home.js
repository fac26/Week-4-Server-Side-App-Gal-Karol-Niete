const { layout, home, homeLoggedIn } = require("../templates/template");
const { getSession } = require("../model/session");

function get(request, response) {
  const sid = request.signedCookies.sid;
  const session = getSession(sid);
  const title = "I \u2665 Food!";

  if (session) {
    const content = homeLoggedIn();
    const html = layout({ title, content });
    response.send(html);
  }

  const content = home();
  const html = layout({ title, content });
  response.send(html);
}

module.exports = { get };
