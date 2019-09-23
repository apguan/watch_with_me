import React from "react";

import { MainContainer } from "./styled_components/containers";
import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

import PlaylistHooks from "./PlaylistHooks";
import { SocketHooks } from "./SocketHooks";

const Main = () => {
  const {
    queue,
    removeVideo,
    addVideo,
    dequeueVideo,
    syncVideos
  } = PlaylistHooks();
  const { socket } = SocketHooks();

  console.log("Connected: ", socket);

  return (
    <MainContainer>
      <PlaylistContainer
        socket={socket}
        queue={queue}
        removeVideo={removeVideo}
        addVideo={addVideo}
        syncVideos={syncVideos}
      />
      <VideoContainer
        socket={socket}
        queue={queue}
        dequeueVideo={dequeueVideo}
      />
      <ChatBarContainer socket={socket} />
    </MainContainer>
  );
};

export default Main;
