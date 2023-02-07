const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = express.urlencoded({ extended: false });

const server = express();
const cookies = cookieParser(process.env.COOKIE_SECRET); //process.env.COOKIE_SECRET

server.use(cookies); //pass cookieParser to all reoutes with req object


const login = require("./routes/login");

server.get("/login", login.get);

module.exports = server;
