import styled from "styled-components";
import { fadeIn } from "./animations.js";

//need to use input to allow for proper overflow
export const UrlText = styled.input`
  position: relative;
  border: none;
  margin: 0 10px;
  width: 75%;
  vertical-align: middle;
  font-family: "Titillium Web", sans-serif;

  &::-webkit-input-placeholder {
    line-height: 1em;
    font-family: "Titillium Web", sans-serif;
    font-size: 16px;
    color: #5b5b5b;
  }

  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  float: left;
  height: 36px;
  border: none;
  text-indent: 15px;
  font-family: "Titillium Web", sans-serif;

  &:focus {
    outline: none;
    animation: ${fadeIn} 1s linear;
    border-bottom: 2px solid #6d69d3;
  }

  &::-webkit-input-placeholder {
    font-family: "Titillium Web", sans-serif;
    font-size: 16px;
    color: #5b5b5b;
  }
`;

export const Add = styled.i`
  width: 15%;
  margin 9px 0;
  height: 36px;
  border: none;
  background-color: none;

  &:hover {
    cursor: pointer;
    color: #20B2AA;
    animation: ${fadeIn} 0.1s linear;
  }

  &:focus {
    outline: none;
  }
`;

export const Remove = styled.i`
  border: none;
  background-color: none;
  float: right;
  height: 20px;
  width: 20px;
  margin: 5px 3px 0 0;

  &:hover {
    cursor: pointer;
    color: #ff4040;
    animation: ${fadeIn} 0.1s linear;
  }

  &:focus {
    outline: none;
  }
`;

export const ChatTitle = styled.p`
  width: 100%;
  padding-left: 12px;
  text-align: left;
  line-height: 16px;
`;

export const ChatInput = styled.textarea`
  position: relative;
  width: 100%;
  border: none;
  bottom: 0;
  height: 5em;
  resize: none;
  border-radius: 5px;
  font-family: "Titillium Web", sans-serif;

  &:focus {
    outline: none;
    border: 1px solid #6d69d3;
    animation: ${fadeIn} 0.5s linear;
  }
`;

export const SendButton = styled.button`
  position: absolute:
  border: none;
  height: 100%;
  color: white;
  font-weight: bold;
  background-color: #696969;
  font-family: "Titillium Web", sans-serif;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #787878;
    cursor: pointer;asdfa
  }
`;

export const Playback = styled.div`
  position: absolute;
  background-color: red;
  border: none;
  border-radius: 7px;
  height: 100%;
  width: ${props => (props.currTime / props.time) * 100 + 0.1}%;
  z-index: -1;
`;

export const PlayButtons = styled.i`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px;

  &:hover {
    cursor: pointer;
    color: red;
  }
`;

export const TimeStamp = styled.p`
  margin: 0;
  text-align: center;
`;
