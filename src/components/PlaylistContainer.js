import React, { useState } from "react";
import {
  Window,
  InputBar,
  UrlContainer,
  VideoPreview
} from "./styled_components/containers";

import { Input, UrlText, Remove, Add } from "./styled_components/components";

const PlaylistContainer = ({ queue, removeVideo, addVideo }) => {
  const [input, setInput] = useState([]);

  const handleTextChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = e => {
    addVideo(input);
    setInput("");
  };

  const handleKeyEnter = e => {
    if (e.key === "Enter") {
      addVideo(input);
      setInput("");
    }
  };

  return (
    <Window width={15} minWidth={225}>
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
        {queue.map(({ title, thumbnail, uuid }, idx) => {
          return (
            <VideoPreview key={uuid}>
              <img src={thumbnail} height="39px" width="70px"></img>
              <UrlText>{title}</UrlText>
              <Remove
                onClick={() => removeVideo(idx)}
                className="fa fa-minus-circle"
                aria-hidden="true"
              ></Remove>
            </VideoPreview>
          );
        })}
      </UrlContainer>
    </Window>
  );
};

export default PlaylistContainer;
