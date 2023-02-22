const createaccounts = async (req, res) => {
  let { data } = req.body;

  // console.log("Received name", room_name);
  try {
    let token = await axios.post(
      apiurl + "/",

      {
        data,
        permissions: [
          "room.list_available_layouts",
          "room.set_layout",
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.video_unmute",
          "room.recording",
        ],
      }

      // { auth }
    );

    console.log(token.data);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e.response.data);
    return res.send(e.message);
  }
};
// -----------------------create room api-----------------
const createrooms = async (req, res) => {
  let {
    name,
    display_name,
    max_members,
    quality,
    join_from,
    join_until,
    remove_at,
    remove_after_seconds_elapsed,
    layout,
    record_on_start,
    enable_room_previews,
  } = req.body;

  console.log("Received name", room_name);
  try {
    let token = await axios.post(
      apiurl + "/rooms",

      {
        name: name,
        display_name: display_name,
        max_members: max_members,
        quality: quality,
        join_from: join_from,
        join_until: join_until,
        remove_at: remove_at,
        remove_after_seconds_elapsed: remove_after_seconds_elapsed,
        layout: layout,
        record_on_start: record_on_start,
        enable_room_previews: enable_room_previews,
        permissions: [
          "room.list_available_layouts",
          "room.set_layout",
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.video_unmute",
          "room.recording",
        ],
      },

      { auth }
    );

    console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e.response.data);
    return res.send(e.message);
  }
};

// -----------------------get updated---------------
const updaterooms = async (req, res) => {
  let {
    display_name,
    max_members,
    quality,
    join_from,
    join_until,
    remove_at,
    remove_after_seconds_elapsed,
    layout,
    record_on_start,
    enable_room_previews,
  } = req.body;

  try {
    let token = await axios.put(
      apiurl + `/rooms/${id}`,
      {
        display_name: display_name,
        max_members: max_members,
        quality: quality,
        join_from: join_from,
        join_until: join_until,
        remove_at: remove_at,
        remove_after_seconds_elapsed: remove_after_seconds_elapsed,
        layout: layout,
        record_on_start: record_on_start,
        enable_room_previews: enable_room_previews,
        permissions: [
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.deaf",
          "room.self.undeaf",
          "room.self.set_input_volume",
          "room.self.set_output_volume",
          "room.self.set_input_sensitivity",
          "room.recording",
        ],
      },
      "room.self.audio_mute",
      "room.self.audio_unmute",
      { auth }
    );
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e.response.data);
    return res.send(e.message);
  }
};

// ----------------------------room delete api----------------------
const deleterooms = async (req, res) => {
  try {
    let token = await axios.delete(
      apiurl + `/rooms/${id}`,

      { auth }
    );

    console.log(token.data);
    return res.json({ message: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
const getroomsbyid = async (req, res) => {
  try {
    let token = await axios.get(
      apiurl + `rooms/${id}`,

      { auth }
    );

    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

const getRoomSessions = async (req, res) => {
  try {
    let token = await axios.get(
      apiurl + `room_sessions`,

      { auth }
    );
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
const getRoomSessionsbyid = async (req, res) => {
  try {
    let token = await axios.get(
      apiurl + `room_sessions/${id}`,

      { auth }
    );
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

const getroomsbymemberid = async (req, res) => {
  try {
    let token = await axios.get(
      apiurl + `room_sessions/${id}/members`,
      {
        permissions: [
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.deaf",
          "room.self.undeaf",
          "room.self.set_input_volume",
          "room.self.set_output_volume",
          "room.self.set_input_sensitivity",
          "room.recording",
        ],
      },
      { auth }
    );
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

const createconferencevideo = async (req, res) => {
  let { data } = req.body;

  console.log("Received name", room_name);
  try {
    let token = await axios.post(
      apiurl + "/conferences",

      {
        data,
        permissions: [
          "room.list_available_layouts",
          "room.set_layout",
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.video_unmute",
          "room.recording",
        ],
      },

      { auth }
    );

    console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e.response.data);
    return res.send(e.message);
  }
};
const updateconferencevideo = async (req, res) => {
  let { data } = req.body;

  console.log("Received name", room_name);
  try {
    let token = await axios.post(
      apiurl + `/conferences/${id}`,

      {
        data,
        permissions: [
          "room.list_available_layouts",
          "room.set_layout",
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.video_unmute",
          "room.recording",
        ],
      },

      { auth }
    );

    console.log(token.data.token);
    return res.json({ token: token.data.token });
  } catch (e) {
    console.log(e.response.data);
    return res.send(e.message);
  }
};
const deletconferencevideo = async (req, res) => {
  try {
    let token = await axios.delete(
      apiurl + `/conferences/${id}`,
      {
        permissions: [
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.deaf",
          "room.self.undeaf",
          "room.self.set_input_volume",
          "room.self.set_output_volume",
          "room.self.set_input_sensitivity",
          "room.recording",
        ],
      },
      { auth }
    );
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
const getconferencevideo = async (req, res) => {
  try {
    let token = await axios.get(
      apiurl + `/conferences`,
      {
        permissions: [
          "room.self.audio_mute",
          "room.self.audio_unmute",
          "room.self.video_mute",
          "room.self.video_unmute",
          "room.self.deaf",
          "room.self.undeaf",
          "room.self.set_input_volume",
          "room.self.set_output_volume",
          "room.self.set_input_sensitivity",
          "room.recording",
        ],
      },
      { auth }
    );
    return res.json({ token: token.data });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
route.get("/", control.getroomsbymemberid);
route.get("/rooms/:id", control.getroomsbyid);
route.post("/rooms", control.createrooms);
route.put("/rooms/:id", control.updaterooms);
route.delete("/rooms/:id", control.deleterooms);
