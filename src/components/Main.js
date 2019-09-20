import React from "react";

import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

import { MainContainer } from "./styled_components/containers";

const Main = () => {
  return (
    <MainContainer>
      <PlaylistContainer></PlaylistContainer>
      <VideoContainer></VideoContainer>
      <ChatBarContainer></ChatBarContainer>
    </MainContainer>
  );
};

export default Main;
