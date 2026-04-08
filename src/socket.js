import { io } from "socket.io-client";

import URL from "./getUrl";

export const socket = io(URL, {
  autoConnect: false, // ❗ important
  transports: ["websocket"], // better performance
  withCredentials: true,
});