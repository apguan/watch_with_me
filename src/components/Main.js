import React from "react";
import styled from "styled-components";

import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

let Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15vh auto;
  text-align: center;
`;

const Main = () => {
  return (
    <Container>
      <PlaylistContainer></PlaylistContainer>
      <VideoContainer></VideoContainer>
      <ChatBarContainer></ChatBarContainer>
    </Container>
  );
};

export default Main;
