const { layout, signUpForm } = require('../templates/template');
const { createUser } = require('../model/user');
const { createSession } = require('../model/session');
const bcrypt = require('bcryptjs');

function get(request, response) {
  const title = 'Sign up | I :heart: food!';
  const signUpTitle = 'Sign up';
  const content = /*html*/ `
        ${signUpForm(signUpTitle)}
      `;
  response.send(layout({ title, content }));
}

function post(request, response) {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400).send('<h1>Login Failed.</h1>');
  }

  bcrypt.hash(password, 12).then((hash) => {
    const user = createUser(name, hash);
    const session_id = createSession(user.id);
    response.cookie('sid', session_id, {
      signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });
    response.redirect(`/`);
  });
}

module.exports = { get, post };
