import react, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

export const SocketHooks = () => {
  let connectSocket = function(room) {
    return socketIOClient("http://localhost:4000", {
      query: "r_var=" + room
    });
  };

  let roomId = window.location.pathname;
  let socket = connectSocket(roomId);

  return {
    socket
  };
};
