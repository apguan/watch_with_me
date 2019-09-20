import React from "react";
import styled from "styled-components";

import {
  Window,
  InputBar,
  UrlContainer,
  Url
} from "./styled_components/containers";
import { Input, UrlText, Remove, Add } from "./styled_components/components";

import PlaylistContainerHooks from "./PlaylistContainerHooks";

const PlaylistContainer = () => {
  const {
    addVideo,
    input,
    queue,
    handleTextChange,
    removeVideo
  } = PlaylistContainerHooks();

  const submitToQueue = e => {
    if (e.which === 13) {
      addVideo();
    }
  };

  return (
    <Window width={20}>
      <InputBar>
        <Input
          onChange={handleTextChange}
          placeholder="Queue Up A Video!"
          value={input}
          onKeyPress={submitToQueue}
        ></Input>
        <Add type="submit" onClick={addVideo}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Add>
      </InputBar>
      <UrlContainer>
        {queue.map((val, idx) => {
          return (
            <Url key={idx}>
              <UrlText value={`${idx + 1}: ` + val} disabled></UrlText>
              <Remove onClick={() => removeVideo(val)}>
                <i className="fa fa-minus" aria-hidden="true"></i>
              </Remove>
            </Url>
          );
        })}
      </UrlContainer>
    </Window>
  );
};

export default PlaylistContainer;
