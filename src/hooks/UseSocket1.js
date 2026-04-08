import { useEffect, useRef } from "react";
import { socket } from "../socket";

// const UseSocket1 = (user) => {
//   const isConnected = useRef(false); // ✅ track connection

//   useEffect(() => {
//     if (!user?._id) return;

//     // ✅ prevent duplicate connect
//     if (!isConnected.current) {
//       socket.connect();
//       isConnected.current = true;

//       console.log("Socket Connected Once ✅");
//     }

//     // ✅ emit only once per user
//     socket.emit("addUser", user._id);

//     return () => {
//       // ❌ DO NOT disconnect here in dev (causes reconnect loop)
//       // socket.disconnect();
//     };
//   }, [user?._id]);
// };

// export default UseSocket1;

const UseSocket1 = (user) => {
  useEffect(() => {
    if (!user?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    // Register user on first load
    socket.emit("addUser", user._id);

    // ✅ RE-REGISTER on reconnection
    // If the server restarts, the server "users" object clears.
    // This tells the server who we are as soon as we reconnect.
    const handleReconnect = () => {
      socket.emit("addUser", user._id);
      console.log("Re-registered user after connection drop");
    };

    socket.on("connect", handleReconnect);

    return () => {
      socket.off("connect", handleReconnect);
    };
  }, [user?._id]);
};

export default UseSocket1;