import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { uniqueNamesGenerator } from "unique-names-generator";
import uuidv1 from "uuid/v1";

const UniqueNamesGeneratorConfig = {
  separator: " ",
  length: 3
};

const randomName = uniqueNamesGenerator(UniqueNamesGeneratorConfig)
  .split(" ")
  .map(str => str[0].toUpperCase() + str.slice(1))
  .join(" ");

const ChatHooks = socket => {
  const [nickName] = useState(randomName);
  const [messages, setMessages] = useState([]);
  const [initial, setInital] = useState(false);

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
    if (!initial) {
      socket.emit("initial sync");
      socket.on("initial sync", intialData => {
        console.log("messages: ", intialData.messages);
        syncMessages(intialData.messages);
        setInital(true);
      });

      socket.off("initial sync");
    }

    socket.on("sync messages", incomingMsg => {
      console.log("messages: ", incomingMsg);
      syncMessages(incomingMsg);
    });

    return () => {
      socket.off("sync messages");
    };
  }, [syncMessages, socket, messages, initial, setInital]);

  return {
    messages,
    addMessage,
    nickName
  };
};

export default ChatHooks;
