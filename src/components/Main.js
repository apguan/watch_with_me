import React from "react";

import { MainContainer } from "./styled_components/containers";
import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

import PlaylistHooks from "./PlaylistHooks";

const Main = () => {
  const {
    queue,
    removeVideo,
    addVideo,
    dequeueVideo,
    socket
  } = PlaylistHooks();

  return (
    <MainContainer>
      <PlaylistContainer
        queue={queue}
        removeVideo={removeVideo}
        addVideo={addVideo}
      />
      <VideoContainer
        socket={socket}
        queue={queue}
        dequeueVideo={dequeueVideo}
      />
      <ChatBarContainer />
    </MainContainer>
  );
};

export default Main;
