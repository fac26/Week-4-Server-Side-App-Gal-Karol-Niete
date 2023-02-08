const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = express.urlencoded({ extended: false });

const server = express();
const cookies = cookieParser(process.env.COOKIE_SECRET); //process.env.COOKIE_SECRET

server.use(cookies); //pass cookieParser to all reoutes with req object

const homepage = require('./routes/home');
const login = require("./routes/login");


server.get('/', homepage.get);
server.get("/log-in", login.get);

module.exports = server;
