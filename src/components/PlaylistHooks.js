import { useState } from "react";

const PlaylistHooks = () => {
  const [queue, setQueue] = useState([]);

  const syncVideos = videos => {
    setQueue(videos);
  };

  const addVideo = input => {
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
    dequeueVideo,
    syncVideos
  };
};

export default PlaylistHooks;
