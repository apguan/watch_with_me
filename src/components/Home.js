import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "baseui/button";
import { ButtonGroup, MODE } from "baseui/button-group";
import uuidv1 from "uuid/v1";

import { MainContainer, InputWindow } from "./styled_components/containers";
import { Input } from "./styled_components/components";
import { fadeIn, flicker } from "./styled_components/animations";
import { videoDetector } from "../VideoDetector";

const Title = styled.h3`
  margin: 25px;
  font-family: "Titillium Web", sans-serif;
  font-size: 24px;
  line-height: 1em;
`;

const ErrorText = styled.p`
  color: red;
  font-family: "Titillium Web", sans-serif;
  margin: 3px;
  text-align: justify;
  font-size: 12px;
  line-height: 12px;
  animation: ${fadeIn} 1s linear;
`;

const InstructionTitle = styled.p`
  margin: 10px;
  font-family: "Titillium Web", sans-serif;
  text-decoration: underline;
  font-size: 14px;
  line-height: 1em;
`;

const Instructions = styled.p`
  font-family: "Titillium Web", sans-serif;
  margin: 3px;
  text-align: justify;
  font-size: 12px;
  line-height: 12px;
`;

const EnterButton = styled.button`
  margin: 15px;
  color: #ffffff;
  background-color: #5d59c9;
  border: none;
  border-radius: 5px;
  height: 36px;
  width: 100px;
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  outline: none;

  &:focus {
    outline: none:
  }

  &:hover {
    background-color: #6d69d3;
    cursor: pointer;
  }
`;

const InstructionsContainer = styled.div`
  margin: 0px 0px 20px 0px;
  padding: 20px;
`;

const Loading = styled.button`
  margin: 15px;
  color: #ffffff;
  background-color: #6d69d3;
  border: none;
  border-radius: 5px;
  height: 36px;
  width: 100px;
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  outline: none;

  -webkit-animation: ${flicker} 1.5s infinite;
  -moz-animation: ${flicker} 1.5s infinite;
  -o-animation: ${flicker} 1.5s infinite;
  animation: ${flicker} 1.5s infinite;
`;

const YOUTUBE = "youtube";
const OTHER = "other";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videoSrc, setVideoSrc] = useState(YOUTUBE);
  const [selected, setSelected] = useState(0);

  const handleInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const uuid = uuidv1();
    if (videoSrc === YOUTUBE) {
      if (videoDetector(input)) {
        setLoading(true);
        let payload = {
          video: input
        };

        fetch(`/youtube/${uuid}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
          .then(() => {
            console.log("redirecting");
            window.location.href = `/${uuid}`;
            setInput("");
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setError(true);
      }
    } else {
      setLoading(true);
      let payload = {
        video: input
      };

      fetch(`/other/${uuid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(() => {
          console.log("redirecting");
          window.location.href = `/${uuid}`;
          setInput("");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVideoSource = src => {
    setVideoSrc(src);
  };

  return (
    <MainContainer>
      <ButtonGroup
        mode={MODE.radio}
        selected={selected}
        onClick={(event, index) => {
          setSelected(index);
        }}
      >
        <Button onClick={() => handleVideoSource(YOUTUBE)}>Youtube</Button>
        <Button onClick={() => handleVideoSource(OTHER)}>Other</Button>
      </ButtonGroup>

      <InputWindow>
        {videoSrc === YOUTUBE && (
          <>
            <Title>Enter Youtube Link</Title>
            <Input
              width={60}
              onChange={handleInput}
              value={input}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              onKeyPress={handleEnter}
              center={true}
            ></Input>
            {error ? (
              <ErrorText>Please input a valid Youtube link</ErrorText>
            ) : null}
            {loading ? (
              <Loading>Loading...</Loading>
            ) : (
              <EnterButton onClick={handleSubmit}>Create Room</EnterButton>
            )}
            <InstructionsContainer>
              <InstructionTitle>Instructions:</InstructionTitle>
              <Instructions>• Enter a Youtube link</Instructions>
              <Instructions>• Share the link with your friends</Instructions>
              <Instructions>
                • Watch and control the same video together!
              </Instructions>
            </InstructionsContainer>
          </>
        )}

        {videoSrc === OTHER && (
          <>
            <Title>Enter A Video Source</Title>
            <Input
              width={60}
              onChange={handleInput}
              value={input}
              placeholder="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              onKeyPress={handleEnter}
              center={true}
            ></Input>
            {loading ? (
              <Loading>Loading...</Loading>
            ) : (
              <EnterButton onClick={handleSubmit}>Create Room</EnterButton>
            )}
            <InstructionsContainer>
              <InstructionTitle>Instructions:</InstructionTitle>
              <Instructions>
                • Enter a video source, this can be anything!
              </Instructions>
              <Instructions>• Share the link with your friends</Instructions>
              <Instructions>
                • Watch and control the same video together!
              </Instructions>
            </InstructionsContainer>
          </>
        )}
      </InputWindow>
    </MainContainer>
  );
};

export default Home;
