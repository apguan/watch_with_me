import React from "react";
import styled from "styled-components";

//video container stuff
export const VolumeContainer = styled.div`
  display: inline-flex;
  margin: 0 8% 0 0;
  align-self: center;
`;

export const Slider = styled.input`
  width: 5vw;
  height: 8px;
`;

const VolumeSlider = ({ volume, handleVolumeChange }) => {
  const updateVolumeBar = e => {
    handleVolumeChange(e.target.value);
  };

  return (
    <VolumeContainer>
      <Slider
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onInput={updateVolumeBar}
      />
    </VolumeContainer>
  );
};

export default VolumeSlider;
