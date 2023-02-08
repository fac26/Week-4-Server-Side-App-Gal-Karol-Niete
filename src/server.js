const express = require('express');
const { getSession } = require('./model/session');
const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });

const server = express();
const cookies = cookieParser(process.env.COOKIE_SECRET); //process.env.COOKIE_SECRET

function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    req.session = session;
  }
  next();
}

const signUp = require('./routes/sign-up');

server.use(cookies); //pass cookieParser to all reoutes with req object
server.use(sessions);

server.get('/sign-up', signUp.get);
server.use(cookies);

const home = require('./routes/home');
const login = require('./routes/login');

server.get('/', home.get);
server.get('/log-in', login.get);

module.exports = server;
