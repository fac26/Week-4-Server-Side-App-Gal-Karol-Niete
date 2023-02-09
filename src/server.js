const express = require("express");
const cookieParser = require("cookie-parser");
const { sessions } = require("./templates/helper");

const cookies = cookieParser(process.env.COOKIE_SECRET);
const bodyParser = express.urlencoded({ extended: false });
const server = express();

server.use(cookies);
server.use(sessions);

const home = require("./routes/home");
const login = require("./routes/login");
const logout = require("./routes/logout");
const signUp = require("./routes/sign-up");
const allFood = require("./routes/allFoods");

server.get("/", home.get);
server.get("/sign-up", signUp.get);
server.get("/log-in", login.get);
server.get("/all-foods", allFood.get);
server.post("/sign-up", bodyParser, signUp.post);
server.post("/log-in", bodyParser, login.post);
server.post("/log-out", logout.post);

module.exports = server;
