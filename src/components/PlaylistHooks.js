import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const PlaylistHooks = socket => {
  const [queue, setQueue] = useState([]);

  const syncVideo = useCallback(
    newQueue => {
      if (!_.isEqual(queue, newQueue)) {
        setQueue(newQueue);
      }
    },
    [queue]
  );

  const addVideo = useCallback(
    input => {
      if (input.length) {
        socket.emit("queue", input);
      }
    },
    [socket]
  );

  const removeVideo = useCallback(
    idx => {
      socket.emit("remove", idx);
    },
    [socket]
  );

  const dequeueVideo = useCallback(() => {
    socket.emit("dequeue");
  }, [socket]);

  useEffect(() => {
    socket.on("sync playlist", newQueue => {
      console.log("queue: ", newQueue);
      syncVideo(newQueue);
    });

    return () => {
      socket.off("sync playlist");
    };
  }, [socket, queue, syncVideo]);

  return {
    queue,
    removeVideo,
    addVideo,
    dequeueVideo
  };
};

export default PlaylistHooks;
