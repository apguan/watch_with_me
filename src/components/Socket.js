import { useState } from "react";
import socketIOClient from "socket.io-client";

let connectSocket = function(room) {
  return socketIOClient(
    "ws://watch-youtube-with-me.herokuapp.com/socket.io/?EIO=4&transport=websocket",
    {
      query: "r_var=" + room
    }
  );
};

export const Sockets = roomId => {
  const [socket] = useState(
    connectSocket(roomId.slice(1)).connect(data => {
      console.log("connected:", data);
    })
  );

  return {
    socket
  };
};
