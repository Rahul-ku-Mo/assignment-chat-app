import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://chat-backend-jbta.onrender.com");
    setSocket(newSocket);

    newSocket.on("connection", () => {
      console.log("Connected to server");
    });

    return () => {
      newSocket.off("connection");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};