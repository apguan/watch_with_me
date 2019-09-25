const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const fetchVideoInfo = require("youtube-info");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {});

app.get("/:roomId", (req, res) => {});

let roomDetails = {};

const youtubeParser = async url => {
  const parseVideoId = url => {
    if (url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length === 11) {
        return match[2];
      }
    }
  };

  try {
    return await fetchVideoInfo(parseVideoId(url)).then(videoInfo => {
      return videoInfo;
    });
  } catch (e) {
    console.log(e);
  }
};

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
    console.log(
      details.queue,
      details.messages,
      details.videoDetails,
      socket.id
    );

    io.to(room).emit("sync playlist", details.queue);
    io.to(room).emit("sync messages", details.messages);
    io.to(room).emit("sync video details", details.videoDetails);
  });

  socket.on("initial sync", () => {
    io.to(room).emit("initial sync", details);
  });

  socket.on("messages", msg => {
    details.messages.push(msg);
    io.to(room).emit("sync messages", details.messages);
  });

  socket.on("queue", async video => {
    const metaData = await youtubeParser(video);

    if (metaData) {
      let videoData = {
        videoId: metaData.videoId,
        title: metaData.title,
        url: metaData.url,
        thumbnail: metaData.thumbnailUrl
      };

      details.queue.push(videoData);
      io.to(room).emit("sync playlist", details.queue);
    }
  });

  socket.on("remove", idx => {
    let newArr = details.queue
      .slice(0, idx)
      .concat(details.queue.slice(idx + 1));
    details.queue = newArr;
    io.to(room).emit("sync playlist", details.queue);
  });

  socket.on("dequeue", () => {
    details.queue.shift();
    io.to(room).emit("sync playlist", details.queue);
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
