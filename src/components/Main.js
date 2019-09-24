import React from "react";

import { MainContainer } from "./styled_components/containers";
import VideoContainer from "./VideoContainer";
import ChatBarContainer from "./ChatBarContainer";
import PlaylistContainer from "./PlaylistContainer";

import PlaylistHooks from "./PlaylistHooks";
import { Sockets } from "./Socket";

const Main = () => {
  const { socket } = Sockets(window.location.pathname);
  const { queue, removeVideo, addVideo, dequeueVideo } = PlaylistHooks(socket);

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
      <ChatBarContainer socket={socket} />
    </MainContainer>
  );
};

export default Main;
