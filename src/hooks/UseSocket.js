import { useEffect, useRef } from "react";
import { socket } from "../socket";

const useSocket = (user) => {
  const isConnected = useRef(false); // ✅ track connection

  useEffect(() => {
    if (!user?._id) return;

    // ✅ prevent duplicate connect
    if (!isConnected.current) {
      socket.connect();
      isConnected.current = true;

      console.log("Socket Connected Once ✅");
    }

    // ✅ emit only once per user
    socket.emit("addUser", user._id);

    return () => {
      // ❌ DO NOT disconnect here in dev (causes reconnect loop)
      // socket.disconnect();
    };
  }, [user?._id]);
};

export default useSocket;