import React, { useState, useRef, useEffect } from "react";
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
  SendButton,
  ChatBubble,
  TimeText,
  Name
} from "./styled_components/components";

const ChatBarContainer = ({ socket }) => {
  const { messages, addMessage, nickName } = ChatHooks(socket);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const handleInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const scrollToRef = ref => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const handleSubmit = () => {
    if (input.length) {
      addMessage(input);
      setInput("");
    }
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => scrollToRef(scrollRef);
  }, [scrollRef, scrollToRef]);

  return (
    <Window width={20} minWidth={225}>
      <ChatTitle>Hello, {nickName}</ChatTitle>
      <ChatWindow ref={scrollRef}>
        {messages.map(({ name, message, timeStamp, uuid }) => {
          if (nickName === name) {
            return (
              <ChatBubble background={"#b4c4da"} side={"right"} key={uuid}>
                <Name>Me</Name>
                {message}
                <TimeText timePosition={"right"}>
                  {ta.ago(new Date(timeStamp) - 1000)}
                </TimeText>
              </ChatBubble>
            );
          } else {
            return (
              <ChatBubble background={"#90a5f9"} side={"left"} key={uuid}>
                <Name>{name}</Name>
                {message}
                <TimeText timePosition={"left"}>
                  {ta.ago(new Date(timeStamp) - 1000)}
                </TimeText>
              </ChatBubble>
            );
          }
        })}
      </ChatWindow>
      <ChatInputContainer>
        <ChatInput
          placeholder="Be social here!"
          value={input}
          onChange={handleInput}
          onKeyPress={handleEnter}
        ></ChatInput>
        <SendButton
          onClick={handleSubmit}
          className="fas fa-arrow-right fa-2x"
        />
      </ChatInputContainer>
    </Window>
  );
};

export default ChatBarContainer;
