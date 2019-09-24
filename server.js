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
    socket.to(room).emit("sync playlist", {
      action: "sync",
      payload: details.queue
    });

    socket.to(room).emit("sync messages", details.messages);
    socket.to(room).emit("sync video details", details.videoDetails);
  });

  socket.on("message", msg => {
    details.messages.push(msg);
    socket.to(room).emit("sync messages", details.messages);
  });

  socket.on("queue", video => {
    details.queue.push(video);
    socket.to(room).broadcast.emit("sync playlist", {
      action: "sync",
      payload: video
    });
  });

  socket.on("remove", idx => {
    let newArr = details.queue
      .slice(0, idx)
      .concat(details.queue.slice(idx + 1));
    details.queue = newArr;
    socket.to(room).broadcast.emit("sync playlist", {
      action: "sync",
      payload: idx
    });
  });

  socket.on("dequeue", () => {
    console.log("dequeue before: ", details.queue);
    details.queue.shift();
    console.log("dequeue after: ", details.queue);
    socket.to(room).broadcast.emit("sync playlist", {
      action: "dequeue"
    });
  });

  socket.on("video details", details => {
    details.videoDetails = details;
    socket.to(room).emit("sync video player", details.videoDetails);
  });

  socket.on("disconnect", function() {
    socket.leave(room);
    console.log("user disconnected");
  });
});

http.listen(4000, () => {
  console.log("listening on 4000");
});
