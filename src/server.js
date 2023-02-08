const express = require('express');
const { getSession } = require('./model/session');
const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });
const { sessions } = require('./templates/helper');

const server = express();
const cookies = cookieParser(process.env.COOKIE_SECRET); //process.env.COOKIE_SECRET

const signUp = require('./routes/sign-up');

server.use(cookies); //pass cookieParser to all reoutes with req object
server.use(sessions);

server.get('/sign-up', signUp.get);
server.post('/sign-up', bodyParser, signUp.post);
server.use(cookies);

const home = require('./routes/home');
const login = require('./routes/login');

server.get('/', home.get);
server.get('/log-in', login.get);

module.exports = server;
