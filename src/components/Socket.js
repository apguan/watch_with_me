import { useState } from "react";
import socketIOClient from "socket.io-client";

let connectSocket = function(room) {
  return socketIOClient(window.location.origin, {
    query: "r_var=" + room
  });
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
