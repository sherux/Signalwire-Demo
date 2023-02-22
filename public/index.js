const $ = (x) => document.getElementById(x);

const removeAllButFirstOption = (x) => {
  while (x.childNodes.length > 1) {
    x.removeChild(x.lastChild);
  }
};

const backendurl = "http://localhost:8080";

let room;
let token;
let username;
let roomname;

// Simple js to control when forms appear
function gotopage(pagename) {
  if (pagename === "getusername") {
    $("getusername").style.display = "block";
    $("videoroom").style.display = "none";
    $("loading").style.display = "none";
  } else if (pagename === "videoroom") {
    $("getusername").style.display = "none";
    $("videoroom").style.display = "block";
    $("loading").style.display = "none";
  } else {
    $("getusername").style.display = "none";
    $("videoroom").style.display = "none";
    $("loading").style.display = "block";
  }
}

async function joinwithurl() {
  gotopage("loading");
  join();
}

const spaceurl = localStorage.getItem("spaceurl");
const projecttoken = localStorage.getItem("projecttoken");
const projectid = localStorage.getItem("projectid");
console.log(spaceurl, projecttoken, projectid);

async function join() {
  try {
    token = await axios.post(backendurl + "/get_token", {
      spaceurl: spaceurl,
      projecttoken: projecttoken,
      projectid: projectid,
      user_name: username,
      room_name: roomname,
    });

    token = token.data.token;
    console.log(token);

    if (token == "Unauthorized") {
      // console.log("pjhy8g");

      window.location.replace("http://localhost:8080/login");
      alert("invalid credentials");
    }
    localStorage.setItem("token", token);
    localStorage.getItem("token");
    try {
      console.log("Setting up RTC session");
      try {
        room = new SignalWire.Video.RoomSession({
          token,
          rootElement: document.querySelector("#root"),
        });
      } catch (e) {
        console.log(e);
      }
      room.on("room.joined", (e) => {
        logevent("You joined the room");
      });
      room.on("member.joined", (e) =>
        logevent(e.member.name + " has joined the room")
      );
      room.on("member.left", (e) =>
        logevent(e.member.id + " has left the room")
      );

      await room.join();
      populateLayout();
      populateCamera();
      populateMicrophone();
      generateInstantInviteLink();
    } catch (error) {
      console.error("Something went wrong", error);
    }

    gotopage("videoroom");
  } catch (e) {
    gotopage("getusername");
  }
}

async function joinwithusername() {
  username = $("usernameinput").value.trim();
  roomname = $("roomnameinput").value.trim();
  if (roomname === "" || roomname === undefined) roomname = "signalwire";
  console.log("The user picked username", username);
  gotopage("loading");
  join();
}

async function hangup() {
  if (room) {
    await room.hangup();
    gotopage("getusername");
  }
}

// function logevent(message) {
//   $("events").innerHTML += "<br/>" + message;
// }

//Start
gotopage("getusername");

const urlParams = new URL(document.location).searchParams;
// console.log(urlParams);
console.log(urlParams.get("r"));
if (urlParams.has("r") && urlParams.get("r") !== "") {
  console.log("From URL", urlParams.get("r"));
  roomname = atob(decodeURIComponent(urlParams.get("r")));
  username = Math.random().toString(36).substring(7);
  gotopage("loading");
  joinwithurl();
}

let screenShareObj;
async function share_screen() {
  if (room === undefined) return;
  if (screenShareObj === undefined) {
    screenShareObj = await room.createScreenShareObject();
    $("share_screen_button").innerText = "Turn off Sharing";
  } else {
    screenShareObj.leave();
    screenShareObj = undefined;
    $("share_screen_button").innerText = "Share Screen";
  }
}

// To Change the video call's layout

async function populateLayout() {
  removeAllButFirstOption($("layout_select"));
  $("layout_select").addEventListener("change", async (e) => {
    console.log(e.target.value);
    // toggle_layout(e.target.value);
    await room.setLayout({ name: e.target.value });
    $("layout_indicator").innerText = e.target.value;
  });
  if (room === undefined) return;
  let layouts = await room.getLayoutList();
  layouts.layouts.forEach((layout) => {
    let child = document.createElement("option");
    child.innerText = layout;
    child.value = layout;
    $("layout_select").appendChild(child);
  });
}

// Events for buttons

let audio_muted = false;
$("audio_mute").addEventListener("click", async (e) => {
  if (!room) return;
  if (audio_muted) {
    await room.audioUnmute();
    audio_muted = false;
    $("audio_mute").innerHTML =
      ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16"><path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" /> <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/></svg>';
  } else {
    await room.audioMute();
    audio_muted = true;
    $("audio_mute").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-mute-fill" viewBox="0 0 16 16"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/><path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>';
  }
});

let video_muted = false;
$("video_mute").addEventListener("click", async (e) => {
  if (!room) return;
  if (video_muted) {
    await room.videoUnmute();
    video_muted = false;
    $("video_mute").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16" > <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" /> </svg>';
  } else {
    await room.videoMute();
    video_muted = true;
    $("video_mute").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-off-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925-10-14 .814-.58 10 14-.814.58z"/></svg>';
  }
});

// let recording = false;
// $("record_video").addEventListener("click", async (e) => {
//   if (!room) return;
//   if (recording) {
//     recording = false;

//     $("record_video").innerText = "stop";
//   } else {
//     const rec = await room.startRecording();
//     await rec.stop();
//     recording = true;
//     $("record_video").innerText = "Record";
//   }
// });

async function populateCamera() {
  let cams = await SignalWire.WebRTC.getCameraDevicesWithPermissions();

  removeAllButFirstOption($("camera_select"));
  cams.forEach((cam) => {
    let child = document.createElement("option");
    child.innerText = cam.label;
    child.value = cam.deviceId;
    $("camera_select").appendChild(child);
  });

  $("camera_select").onchange = async (e) => {
    console.log(e.target.value);
    room.updateCamera({ deviceId: e.target.value });
  };
}
async function populateMicrophone() {
  let mics = await SignalWire.WebRTC.getMicrophoneDevicesWithPermissions();

  removeAllButFirstOption($("microphone_select"));
  mics.forEach((mic) => {
    let child = document.createElement("option");
    child.innerText = mic.label;
    child.value = mic.deviceId;
    $("microphone_select").appendChild(child);
  });

  $("microphone_select").onchange = async (e) => {
    console.log(e.target.value);
    room.updateMicrophone({ deviceId: e.target.value });
  };
}

function generateInstantInviteLink() {
  console.log("generating");
  let curURL = new URL(window.location.href);
  curURL.searchParams.set("r", encodeURIComponent(btoa(roomname)));
  $("instant_invite").innerText = curURL.toString();
  console.log(curURL);
}
