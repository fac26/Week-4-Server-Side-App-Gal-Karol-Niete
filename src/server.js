const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded({ extended: false });

const home = require("./routes/home");

const server = express();
const cookies = cookieParser(process.env.COOKIE_SECRET); //process.env.COOKIE_SECRET

server.use(cookies);

server.get("/", home.get);

module.exports = server;
