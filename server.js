const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {});

let roomDetails = {};

app.get("/:roomId", (req, res) => {
  // let room = req.params.roomId;
  // res.send();
});

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
    console.log(details.queue);
    // socket.to(room).emit("sync messages", details.messages);
    // socket.to(room).emit("sync video details", details.videoDetails);
  });

  socket.on("sync playlist", initial => {
    if (initial) {
      socket.to(room).emit("sync playlist", {
        action: "sync",
        payload: details.queue
      });
    }
  });

  socket.on("message", msg => {
    details.messages.push(msg);
    socket.to(room).emit("sync messages", details.messages);
  });

  socket.on("queue", video => {
    details.queue.push(video);
    socket.to(room).broadcast.emit("sync playlist", {
      action: "queue",
      payload: video
    });
  });

  socket.on("remove", idx => {
    let newArr = details.queue
      .slice(0, idx)
      .concat(details.queue.slice(idx + 1));
    details.queue = newArr;
    socket.to(room).broadcast.emit("sync playlist", {
      action: "remove",
      payload: idx
    });
  });

  socket.on("dequeue", () => {
    details.queue.shift();
    socket.to(room).broadcast.emit("sync playlist", {
      action: "dequeue"
    });
  });

  socket.on("video details", playback => {
    console.log(playback);
    details.videoDetails = playback;
    socket.to(room).emit("video details", playback);
  });

  socket.on("disconnect", function() {
    socket.leave(room);
    console.log("user disconnected");
  });
});

http.listen(4000, () => {
  console.log("listening on 4000");
});
