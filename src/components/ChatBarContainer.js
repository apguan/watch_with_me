import React, { useState, useRef } from "react";
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
  TimeText
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
    console.log(ref.current.offsetTop);
    // window.scrollTo({
    //   top: ref.current.offsetTop,
    //   left: 100,
    //   behavior: "smooth"
    // });
  };

  const handleSubmit = () => {
    if (input.length) {
      addMessage(input);
      setInput("");
      scrollToRef(scrollRef);
    }
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Window width={20} minWidth={225}>
      <ChatTitle>Hello, {nickName}</ChatTitle>
      <ChatWindow ref={scrollRef}>
        {messages.map(({ name, message, timeStamp, uuid }) => {
          if (nickName === name) {
            return (
              <ChatBubble background={"#b4c4da"} side={"right"} key={uuid}>
                {message}
                <TimeText>{ta.ago(new Date(timeStamp) - 1000)}</TimeText>
              </ChatBubble>
            );
          } else {
            return (
              <ChatBubble background={"#5c7cfa"} side={"left"} key={uuid}>
                {name}:
                <br />
                {message}
                <TimeText>{ta.ago(new Date(timeStamp) - 1000)}</TimeText>
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
        <SendButton className="fas fa-arrow-right fa-2x" />
      </ChatInputContainer>
    </Window>
  );
};

export default ChatBarContainer;
