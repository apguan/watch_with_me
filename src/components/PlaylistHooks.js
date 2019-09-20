import { useState } from "react";

const PlaylistHooks = () => {
  const [queue, setQueue] = useState([]);

  const addVideo = input => {
    if (input.length) {
      let newQueue = queue.concat(input);
      setQueue(newQueue);
    }
  };

  const removeVideo = video => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i] === video) {
        let newArr = queue.slice(0, i).concat(queue.slice(i + 1));
        setQueue(newArr);
      }
    }
  };

  const popVideo = () => {
    let newArr = queue.slice();
    newArr.pop();

    setQueue(newArr);
  };

  return {
    queue,
    removeVideo,
    addVideo,
    popVideo
  };
};

export default PlaylistHooks;
