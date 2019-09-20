import React from "react";
import PlaylistContainerHooks from "./PlaylistContainerHooks";

import styled from "styled-components";

const Window = styled.div`
  width: 20vw;
  margin: 0 15px;
  height: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Input = styled.input`
  width: 84%;
  float: left;
  height: 36px;
  border: none;
  text-indent: 15px;
  border-bottom: 2px solid;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-size: 16px;
    color: #d3d3d3;
  }
`;

const Button = styled.button`
  width: 15%;
  height: 36px;
`;

const PlaylistContainer = () => {
  const {
    addVideo,
    input,
    queue,
    handleTextChange,
    removeVideo
  } = PlaylistContainerHooks();

  return (
    <Window>
      <div>
        <Input
          onChange={handleTextChange}
          placeholder="Search Video..."
          value={input}
        ></Input>
        <Button onClick={addVideo}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Button>
        <div>
          {queue.map((val, idx) => {
            return (
              <div key={idx}>
                <span>{val}</span>
                <button onClick={() => removeVideo(val)}>
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Window>
  );
};

export default PlaylistContainer;
