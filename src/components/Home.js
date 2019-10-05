import React, { useState } from "react";
import uuidv1 from "uuid/v1";
import styled from "styled-components";

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

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log(videoDetector(input));
    if (videoDetector(input)) {
      setLoading(true);
      const uuid = uuidv1();
      let payload = {
        video: input
      };

      fetch(`/${uuid}`, {
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
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <MainContainer>
      <InputWindow>
        <Title>Enter a Youtube Link</Title>
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
        <InstructionTitle>Instructions:</InstructionTitle>
        <div>
          <Instructions>• Enter a Youtube link</Instructions>
          <Instructions>• Share the link with your friends</Instructions>
          <Instructions>
            • Watch and control the same video together!
          </Instructions>
        </div>
        <br />
        <br />
      </InputWindow>
    </MainContainer>
  );
};

export default Home;
