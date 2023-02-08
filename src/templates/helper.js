function sanitize(str) {
  return str.replace(/</g, '&lt');
}

function validate(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return '';
  }
}

function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    req.session = session;
  }
  next();
}

module.exports = {
  sanitize,
  validate,
  sessions,
};
