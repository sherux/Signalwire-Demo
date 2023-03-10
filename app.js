const { Video } = require("@signalwire/realtime-api");

// Basic express boilerplate
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
const videorroutes = require("./routes/video.routes");
const roomroutes = require("./routes/room.routes");
app.use("/", roomroutes);
app.use("/video", videorroutes);

const auth = {
  username: process.env.project, // Project-ID
  password: process.env.token, // API token
};

app.post("/get_token", cors(), async (req, res) => {
  console.log("====================================>", req.body);
  console.log("get token");
  let {
    spaceurl,
    user_name,
    room_name,
    join_from,
    join_until,
    remove_at,
    remove_after_seconds_elapsed,
    join_audio_muted,
    join_video_muted,
    auto_create_room,
    enable_room_previews,
    room_display_name,
    end_room_session_on_leave,
    media_allowed,
    room_meta,
    meta,
  } = req.body;

  console.log("Received name", user_name);
  try {
    console.log(req.body);
    let token = await axios.post(
      `https://${spaceurl}/api/video` + "/room_tokens",
      {
        spaceurl: spaceurl,
        user_name: user_name,
        room_name: room_name,
        join_from,
        join_until,
        remove_at,
        remove_after_seconds_elapsed,
        join_audio_muted,
        join_video_muted,
        auto_create_room,
        enable_room_previews,
        room_display_name,
        end_room_session_on_leave,
        media_allowed,
        room_meta,
        meta,
        permissions: [
          "room.list_available_layouts",
          "room.set_layout",
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
        ],
      },
      {
        auth: {
          spaceurl: req.body.spaceurl,
          username: req.body.projectid,
          password: req.body.projecttoken,
        },
      }
    );
    console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    res.json({ token: "Unauthorized" });
  }
});

async function start(port) {
  app.listen(port, () => {
    console.log("Server listening at port", port);
  });
}

// Start the server
start(8080);
