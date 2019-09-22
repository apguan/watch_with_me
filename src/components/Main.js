import React from 'react';

import { MainContainer } from './styled_components/containers';
import VideoContainer from './VideoContainer';
import ChatBarContainer from './ChatBarContainer';
import PlaylistContainer from './PlaylistContainer';

import PlaylistHooks from './PlaylistHooks';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4000/');

const Main = () => {
  const { queue, removeVideo, addVideo, dequeueVideo } = PlaylistHooks();
  if (!socket) return null;
  return (
    <MainContainer>
      <PlaylistContainer
        socket={socket}
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
