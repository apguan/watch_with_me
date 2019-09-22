const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", function(socket) {
  console.log("a user connected");
});
http.listen(4000, function() {
  console.log("listening on *:4000");
});
