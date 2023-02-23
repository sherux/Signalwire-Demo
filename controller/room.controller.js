const { Video } = require("@signalwire/realtime-api");

// Basic express boilerplate

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// End basic express boilerplate
const video = new Video.Client({
  project: process.env.project,
  token: process.env.token,
});
video.on("room.started", async (roomSession) => {
  console.log("Room started", roomSession.id);

  roomSession.on("member.joined", async (member) => {
    console.log(member.id);
  });
});
video.on("room.ended", async (roomSession) => {
  console.log("room ended", roomSession.id);
});
// Endpoint to request token for video call
// ------------------------------create rooms--------------------------

const login = async (req, res) => {
  try {
    await res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const join = async (req, res) => {
  try {
    await res.render("join");
  } catch (error) {
    console.log(error.message);
  }
};
const video2 = async (req, res) => {
  try {
    await res.render("video");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  login,
  join,
  video2,
};
