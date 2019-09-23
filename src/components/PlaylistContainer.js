import React, { useState } from "react";
import {
  Window,
  InputBar,
  UrlContainer,
  Url
} from "./styled_components/containers";

import { Input, UrlText, Remove, Add } from "./styled_components/components";

const PlaylistContainer = ({
  queue,
  removeVideo,
  addVideo,
  syncVideos,
  socket
}) => {
  const [input, setInput] = useState([]);

  socket.on("queue", data => {
    syncVideos(data);
  });

  const handleTextChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = e => {
    addVideo(input);
    setInput("");
    socket.emit("queue", input);
  };

  const handleKeyEnter = e => {
    if (e.which === 13) {
      addVideo(input);
      setInput("");
      socket.emit("queue", input);
    }
  };

  return (
    <Window width={20} minWidth={275}>
      <InputBar>
        <Input
          onChange={handleTextChange}
          placeholder="Queue Up A Video!"
          value={input}
          onKeyPress={handleKeyEnter}
        ></Input>
        <Add
          type="submit"
          className="fas fa-plus-circle"
          aria-hidden="true"
          onClick={handleClick}
        ></Add>
      </InputBar>
      <UrlContainer>
        {queue.map((val, idx) => {
          return (
            <Url key={idx}>
              <UrlText value={`${idx + 1}: ` + val} disabled></UrlText>
              <Remove
                onClick={() => removeVideo(val)}
                className="fa fa-minus-circle"
                aria-hidden="true"
              ></Remove>
            </Url>
          );
        })}
      </UrlContainer>
    </Window>
  );
};

export default PlaylistContainer;
