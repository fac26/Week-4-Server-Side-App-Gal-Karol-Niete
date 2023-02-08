const { layout, loginForm, errorPage } = require("../templates/template");
const { getUserByEmail } = require("../model/user");
const { createSession, getSession } = require("../model/session");
const bcrypt = require("bcryptjs");

//login route

function get(request, response) {
  const content = loginForm({}, {});
  const title = "Log in";
  const body = layout({ title, content });
  const sid = request.signedCookies.sid;
  const session = getSession(sid);

  if (session) {
    response.redirect("/all-foods");
  }
  response.send(body);
}

function post(request, response) {
  const { email, password } = request.body;
  const user = getUserByEmail(email);
  const errors = {};
  const title = "Log in";
  if (!user) {
    return response.status(400).send(layout({ title, content: errorPage() }));
  }
  if (!email) {
    errors.email = "Please enter your email";
  }
  if (!password) {
    errors.password = "Please enter your password";
  }
  if (Object.keys(errors).length > 0) {
    const body = layout({
      title,
      content: loginForm(errors, request.body),
    });
    return response.send(body);
  }
  bcrypt.compare(password, user.hash).then((match) => {
    if (!match) {
      return response.status(400).send(errorPage());
    } else {
      const sessionId = createSession(user.id);

      response.cookie("sid", sessionId, {
        signed: true,
        sameSite: "lax",
        httpOnly: true,
      });
      response.redirect("/all-foods");
    }
  });
}

module.exports = { get, post };
