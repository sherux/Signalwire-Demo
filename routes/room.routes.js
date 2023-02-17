const express = require("express");
const route = express.Router();
// const { tests } = require("../middlware");
// const auth = require("../middlware");

const control = require("../controller/room.controller");

route.get("/", control.getroomsbymemberid);
route.get("/rooms/:id", control.getroomsbyid);
// route.post("/login", control.login);
// route.get("/gettoken", control.getusertoken);

route.get("/login", control.login);
route.get("/join", control.join);
route.get("/video", control.video2);

route.post("/rooms", control.createrooms);
route.put("/rooms/:id", control.updaterooms);
route.delete("/rooms/:id", control.deleterooms);
module.exports = route;
