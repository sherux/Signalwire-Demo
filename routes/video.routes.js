const express = require("express");
const route = express.Router();

const control = require("../controller/video.controller");

route.get("/", control.getRecording);
route.delete("/", control.deleteRecording);

module.exports = route;
