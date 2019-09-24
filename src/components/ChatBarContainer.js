import React, { useState, useEffect } from "react";
import ta from "time-ago";

import ChatHooks from "./ChatHooks";

import {
  Window,
  ChatWindow,
  ChatInputContainer
} from "./styled_components/containers";
import {
  ChatTitle,
  ChatInput,
  SendButton
} from "./styled_components/components";

const ChatBarContainer = ({ socket }) => {
  const { messages, addMessage, nickName } = ChatHooks(socket);
  const [input, setInput] = useState("");

  const handleInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    addMessage(input);
    setInput("");
  };

  const handleEnter = e => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      addMessage(input);
      setInput("");
    }
  };

  return (
    <Window width={20} minWidth={225}>
      <ChatTitle>Hello, {nickName}</ChatTitle>
      <ChatWindow>
        {messages.map(({ name, message, timeStamp }) => {
          return (
            <div key={timeStamp}>
              <p>
                {name} at {ta.ago(new Date(timeStamp))}
              </p>
              <p>{message}</p>
            </div>
          );
        })}
      </ChatWindow>
      <ChatInputContainer>
        <ChatInput
          placeholder="Be social here!"
          value={input}
          onChange={handleInput}
          onKeyPress={handleEnter}
        ></ChatInput>
        <SendButton onClick={handleSubmit}>Send</SendButton>
      </ChatInputContainer>
    </Window>
  );
};

export default ChatBarContainer;
