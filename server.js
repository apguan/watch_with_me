const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {});

app.get("/:roomId", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let roomDetails = {};

io.on("connect", socket => {
  let room = socket.handshake["query"]["r_var"];
  socket.join(room);

  if (!roomDetails[room]) {
    roomDetails[room] = {
      queue: [],
      messages: [],
      videoDetails: {}
    };
  }

  console.log("user joined room " + room, roomDetails[room]);
  let details = roomDetails[room];

  socket.on("message", msg => {
    details.messages.push(msg);
    io.to(room).emit("message", details.messages);
  });

  socket.on("queue", videos => {
    details.queue.push(videos);
    console.log(details);
    io.to(room).emit("queue", details.queue);
  });

  socket.on("video details", details => {
    details.videoDetails = details;
    io.to(room).emit("video details", details);
  });

  socket.on("disconnect", function() {
    socket.leave(room);
    console.log("user disconnected");
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
