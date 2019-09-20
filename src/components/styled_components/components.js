import styled from "styled-components";
import { fadeIn } from "./animations.js";

//need to use input to allow for proper overflow
export const UrlText = styled.input`
  border: none;
  margin: 0 10px;
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

export const Add = styled.button`
  width: 15%;
  height: 36px;
  border: none;
  backgroun-color: none;

  &:hover {
    background-color: #cff0cc;
    animation: ${fadeIn} 0.5s linear;
  }

  &:focus {
    outline: none;
  }
`;

export const Remove = styled.button`
  border: none;
  background-color: none;
  float: right;
  height: 20px;
  width: 20px;
  margin: 0 5px 0 0;

  &:hover {
    background-color: #ff4040;
    animation: ${fadeIn} 0.5s linear;
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
  border: none;
  bottom: 0;
  height: 5em;
  resize: none;
  text-indent: 8px;
  font-family: "Titillium Web", sans-serif;

  &:focus {
    outline: none;
    border: 1px solid #6d69d3;
    animation: ${fadeIn} 0.5s linear;
  }
`;
