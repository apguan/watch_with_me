import { useState, useEffect, useCallback } from "react";
import generate from "project-name-generator";
import uuidv1 from "uuid/v1";

const name = generate().spaced;

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
    [socket]
  );

  const syncMessages = useCallback(
    messages => {
      setMessages(messages);
    },
    [setMessages]
  );

  useEffect(() => {
    socket.on("sync messages", incomingMsg => {
      console.log(incomingMsg);
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
