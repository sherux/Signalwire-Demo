const express = require("express");
const route = express.Router();

const cors = require("cors");

const control = require("../controller/room.controller");

route.get("/login", cors(), control.login);
route.get("/join", cors(), control.join);
route.get("/video", cors(), control.video2);

module.exports = route;
