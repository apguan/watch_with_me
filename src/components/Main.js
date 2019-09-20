import React from "react";

import { MainContainer } from "./styled_components/containers";
import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

import PlaylistHooks from "./PlaylistHooks";

const Main = () => {
  const { queue, removeVideo, addVideo, dequeueVideo } = PlaylistHooks();

  return (
    <MainContainer>
      <PlaylistContainer
        queue={queue}
        removeVideo={removeVideo}
        addVideo={addVideo}
      ></PlaylistContainer>
      <VideoContainer
        queue={queue}
        dequeueVideo={dequeueVideo}
      ></VideoContainer>
      <ChatBarContainer></ChatBarContainer>
    </MainContainer>
  );
};

export default Main;
