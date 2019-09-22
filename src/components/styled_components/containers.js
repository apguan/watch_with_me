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

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width}vw;
  min-width: ${props => props.minWidth || 100}px;
  margin: 15px;
  min-height: 450px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

export const Url = styled.div`
  height: 20px;
  position: relative;
  padding: 4px;
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
`;

export const ButtonsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  flex-direction: row;
`;

//chat container stuff
export const ChatWindow = styled.div`
  height: 100%;
`;
