import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import generate from "project-name-generator";
import uuidv1 from "uuid/v1";

const name = generate()
  .spaced.split(" ")
  .map(str => str[0].toUpperCase() + str.slice(1))
  .join(" ");

const ChatHooks = socket => {
  const [nickName] = useState(name);
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback(
    msg => {
      let message = {
        name: nickName,
        message: msg,
        timeStamp: new Date().getTime(),
        uuid: uuidv1()
      };

      socket.emit("messages", message);
    },
    [socket, nickName]
  );

  const syncMessages = useCallback(
    newMessages => {
      if (!_.isEqual(messages, newMessages)) {
        setMessages(newMessages);
      }
    },
    [setMessages, messages]
  );

  useEffect(() => {
    socket.on("sync messages", incomingMsg => {
      console.log("messages: ", incomingMsg);
      syncMessages(incomingMsg);
    });

    return () => {
      socket.off("sync messages");
    };
  }, [syncMessages, socket, messages]);

  return {
    messages,
    addMessage,
    nickName
  };
};

export default ChatHooks;
