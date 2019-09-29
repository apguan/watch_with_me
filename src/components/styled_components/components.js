import styled from "styled-components";
import { fadeIn } from "./animations.js";

//need to use input to allow for proper overflow
export const UrlText = styled.div`
  border: none;
  margin: 10px 2px;
  width: 50%;
  font-family: "Titillium Web", sans-serif;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Input = styled.input`
  width: ${props => (props.width ? props.width : 95)}%;
  text-align: ${props => (props.center ? "center" : "left")};
  align-items: center;
  height: 36px;
  border: none;
  text-indent: 15px;
  font-family: "Titillium Web", sans-serif;
  border-bottom: 2px solid #d3d3d3;

  &:focus {
    outline: none;
    border-bottom: 2px solid #6d69d3;
  }

  &::-webkit-input-placeholder {
    font-family: "Titillium Web", sans-serif;
    font-size: 16px;
    color: #969696;
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
  padding-top: 2px;
  float: right;
  margin: 9px 0;

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
  font-size: 17px;
`;

export const ChatInput = styled.textarea`
  position: relative;
  width: 85%;
  border: none;
  bottom: 0;
  height: 4em;
  resize: none;
  font-family: "Titillium Web", sans-serif;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.i`
  position: absolute:
  float: right;
  display: flex;
  justify-content: center;
  margin: 6px 0;

  &:hover {
    color: #5c7cfa;
    cursor: pointer;asdfa
  }
`;

export const Playback = styled.div`
  position: absolute;
  background-color: red;
  border: none;
  border-radius: 7px;
  height: 100%;
  width: ${props => (Math.ceil(props.currTime) / props.time) * 100}%;
  z-index: -1;
`;

export const PlayButtons = styled.i`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${props => (props.end ? "0 0 0 18%" : "10px")};

  &:hover {
    cursor: pointer;
    color: red;
  }
`;

export const TimeStamp = styled.p`
  margin: 0;
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  text-align: center;
`;

export const ChatBubble = styled.div`
  position: relative;
  font-family: "Titillium Web", sans-serif;
  background-color: ${props => props.background};
  float: ${props => props.side};
  line-height: 1em;
  font-size: 14px;
  color: black;
  margin: 5px;
  padding: 5px;
  max-width: 75%;
  border-radius: 5px;
  text-align: justify;
  overflow-wrap: break-word;
  clear: both;
`;

export const Name = styled.p`
  margin: 0 0 10px 0;
  text-decoration: underline;
  text-align: left;
  font-family: "Titillium Web", sans-serif;
  font-size: 12px;
  color: black;
`;

export const TimeText = styled.p`
  text-align: ${props => props.timePosition};
  line-height: 1em;
  font-family: "Titillium Web", sans-serif;
  font-size: 8px;
  color: black;
`;
