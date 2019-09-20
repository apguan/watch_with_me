import { useState, useEffect } from "react";

const PlaylistContainerHooks = () => {
  const [input, setInput] = useState("");
  const [queue, setQueue] = useState([]);

  const handleTextChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const addVideo = () => {
    if (input.length) {
      let newQueue = queue.concat(input);
      setQueue(newQueue);
      setInput("");
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

  return {
    input,
    queue,
    handleTextChange,
    removeVideo,
    addVideo
  };
};

export default PlaylistContainerHooks;
