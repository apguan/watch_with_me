const express = require("express");
const app = express();

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const uuidv4 = require("uuid/v4");
const ogs = require("open-graph-scraper");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/:roomId", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const videoUrl = req.body.video;

    roomDetails[roomId] = {
      queue: [],
      messages: [],
      videoDetails: {}
    };

    let metaData = await youtubeParser(videoUrl);
    let videoId = parseVideoId(videoUrl);

    if (metaData) {
      let videoData = {
        uuid: uuidv4(),
        videoId: videoId,
        title: metaData.data.ogTitle,
        url: metaData.data.ogUrl,
        thumbnail: metaData.data.ogImage.url
      };

      roomDetails[roomId].queue.push(videoData);
    } else {
      let videoData = {
        uuid: uuidv4(),
        videoId: videoId,
        title: "",
        url: videoUrl,
        thumbnail: ""
      };

      roomDetails[roomId].queue.push(videoData);
    }
    res.status(200).send(true);
  } catch (e) {
    console.log(e);
    res.status(404).send(false);
  }
});

let roomDetails = {};

const parseVideoId = url => {
  if (url) {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  }
};

const youtubeParser = async url => {
  try {
    const options = { url, timeout: 4000 };
    return await ogs(options);
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
      room,
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
    console.log("initial sync", socket.id, details);
    io.to(room).emit("initial sync", details);
  });

  socket.on("messages", msg => {
    details.messages.push(msg);
    io.to(room).emit("sync messages", details.messages);
  });

  socket.on("queue", async video => {
    const metaData = await youtubeParser(video);
    const videoId = parseVideoId(video);

    if (metaData) {
      let videoData = {
        uuid: uuidv4(),
        videoId: videoId,
        title: metaData.data.ogTitle,
        url: metaData.data.ogUrl,
        thumbnail: metaData.data.ogImage.url
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

const port = process.env.PORT || 80;
http.listen(port, () => {
  console.log(`listening on ${port}`);
});
