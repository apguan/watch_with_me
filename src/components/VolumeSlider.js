import React from "react";
import styled from "styled-components";

//video container stuff
export const VolumeContainer = styled.div`
  display: inline-flex;
  margin: 0 10%;
  align-self: center;
  height: 8px;
`;

export const Slider = styled.input`
  width: 50px;
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
