import { useState } from "react";

const PlaylistHooks = () => {
  const [queue, setQueue] = useState([
    "https://www.youtube.com/watch?v=kpe5JNOeu0E",
    "https://www.youtube.com/watch?v=zbWpclMMA2w",
    "https://www.youtube.com/watch?v=VXFKFs2L4eY"
  ]);

  const addVideo = input => {
    if (input.length) {
      let newQueue = queue.concat(input);
      setQueue(newQueue);
    }
  };

  const removeVideo = video => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i] === video) {
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
