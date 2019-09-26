import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 15vh 0;
  text-align: center;
`;

export const InputWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
  margin: 50px;
  min-height: 200px;
  max-height: 500px;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19);
`;

export const Window = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: ${props => props.width}vw;
  min-width: ${props => props.minWidth || 100}px;
  margin: 15px;
  min-height: 375px;
  max-height: 500px;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19);
`;

// Playlist containers
export const InputBar = styled.div`
  margin: 4px 0;
  display: inline-flex;
  width: 100%;
`;

export const UrlContainer = styled.div`
  display: inline-block;
  width: 100%;
  overflow: auto;
`;

export const VideoPreview = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  height: 50px;
  position: relative;
  margin: 5px 0;
  text-align: left;
`;

//video container stuff
export const Timeline = styled.div`
  position: relative;
  margin: 15px auto 0px auto;
  height: 8px;
  width: 95%;
  border-radius: 5px;
  border: 1px solid;

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  flex-direction: row;
`;

//chat container stuff
export const ChatWindow = styled.div`
  width: 100%;
  position: absolute;
  top: 3em;
  bottom: 4em;
  overflow: auto;
`;

export const ChatInputContainer = styled.div`
  background-color: #ffffff;
  position: absolute;
  width: 100%;
  bottom: 5px;
  display: inline-flex;
  border-top: 2px solid #5b5b5b;
  height: 3em;
`;
