import { useState } from "react";
const fetchVideoInfo = require("youtube-info");

const PlaylistHooks = () => {
  const [queue, setQueue] = useState([]);

  const addVideo = input => {
    const parseVideoId = url => {
      if (url) {
        let regExp = `/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/`;
        let match = url.match(regExp);
        if (match && match[2].length == 11) {
          return match[2];
        }
      }
    };

    fetchVideoInfo(parseVideoId(input)).then(videoInfo => {
      console.log(videoInfo);
    });

    if (input.length) {
      let newQueue = queue.concat(input);
      setQueue(newQueue);
    }
  };

  const removeVideo = url => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].url === url) {
        let newArr = queue.slice(0, 1).concat(queue.slice(i + 1));
        setQueue(newArr);
      }
    }
  };

  const dequeueVideo = () => {
    let newArr = queue.slice();
    newArr.shift();

    setQueue(newArr);
  };

  return {
    queue,
    removeVideo,
    addVideo,
    dequeueVideo
  };
};

export default PlaylistHooks;
