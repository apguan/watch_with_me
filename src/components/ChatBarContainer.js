import React from 'react';

import { Window, ChatWindow } from './styled_components/containers';
import { ChatTitle, ChatInput } from './styled_components/components';

const ChatBarContainer = props => {
  return (
    <Window width={20} minWidth={200}>
      <ChatTitle>Chat</ChatTitle>
      <ChatWindow></ChatWindow>
      <ChatInput placeholder="Be social here!"></ChatInput>
    </Window>
  );
};

export default ChatBarContainer;
