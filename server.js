const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/:roomId", (req, res) => {
  console.log("a user connected");
  let room = req.params.roomId;

  const nsp = io.of(room);

  let queue = [];
  let messages = [];
  let videoDetails = {};

  // nsp.on("connect", socket => {
  //   console.log("someone has connected to the room");
  // });

  // nsp.on("queue", socket => {
  //   console.log(socket);
  // });

  // nsp.on("room", socket => {
  //   console.log(socket);
  // });

  // nsp.on("video", socket => {
  //   console.log(socket);
  // });

  nsp.emit("hi", "hello world");
  nsp.emit("queue");
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
