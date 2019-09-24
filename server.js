const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {});

app.get("/:roomId", (req, res) => {});

let roomDetails = {};

io.on("connect", socket => {
  let room = socket.handshake["query"]["r_var"];

  if (!roomDetails[room]) {
    roomDetails[room] = {
      queue: [],
      messages: [],
      videoDetails: {}
    };
  }

  let details = roomDetails[room];

  socket.join(room, () => {
    console.log(details);
    io.to(room).emit("sync playlist", {
      action: "sync",
      payload: details.queue
    });
    io.to(room).emit("sync messages", details.messages);
    io.to(room).emit("sync video details", details.videoDetails);
  });

  socket.on("messages", msg => {
    details.messages.push(msg);
    console.log(msg, details.messages);
    io.to(room).emit("sync messages", details.messages);
  });

  socket.on("queue", video => {
    details.queue.push(video);
    io.to(room).emit("sync playlist", {
      action: "queue",
      payload: video
    });
  });

  socket.on("remove", idx => {
    let newArr = details.queue
      .slice(0, idx)
      .concat(details.queue.slice(idx + 1));
    details.queue = newArr;
    io.to(room).emit("sync playlist", {
      action: "remove",
      payload: idx
    });
  });

  socket.on("dequeue", () => {
    details.queue.shift();
    io.to(room).emit("sync playlist", {
      action: "dequeue"
    });
  });

  socket.on("video details", playback => {
    details.videoDetails = playback;
    io.to(room).emit("video details", playback);
  });

  socket.on("disconnect", function() {
    socket.leave(room);
    console.log("user disconnected");
  });
});

http.listen(4000, () => {
  console.log("listening on 4000");
});
