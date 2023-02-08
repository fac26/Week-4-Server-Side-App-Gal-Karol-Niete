const { removeSession } = require('../model/session');

function post(request, response) {
  removeSession(request.session.id);
  response.clearCookie('sid');
  response.redirect('/');
}

module.exports = { post };
