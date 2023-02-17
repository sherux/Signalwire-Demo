// c0888c1a-816a-4741-9088-428a25d440cf
const { Video } = require("@signalwire/realtime-api");

const apiurl = `https://khushal.signalwire.com/api/video`;

// Basic express boilerplate
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const auth = {
  username: process.env.project, // Project-ID
  password: process.env.token, // API token
};
// End basic express boilerplate
const video = new Video.Client({
  project: process.env.project,
  token: process.env.token,
});
// video.on("room.started", async (roomSession) => {
//   console.log("Room started", roomSession.id);

//   roomSession.on("member.joined", async (member) => {
//     console.log(member.id);
//   });
// });

// --------------------------get recordings data---------------------------
const getRecording = async (req, res) => {
  try {
    // await video.getRoomSessions();
    // video.on("room.started", async (roomSession) => {
    //   console.log("Room started", roomSession);
    // });
    let token = await axios.get(
      apiurl + "/room_recordings",

      { auth }
    );
    console.log("data", token.length);

    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
// ---------------------------delete recordimgs----------------------------
const deleteRecording = async (req, res) => {
  try {
    let token = await axios.delete(
      apiurl + `/room_recordings/${id}`,

      { auth }
    );

    console.log(token.data);
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = { getRecording, deleteRecording };
