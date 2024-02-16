//React hooks
import { useState, useEffect, useContext, useCallback } from "react";

//Context Providers..
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";

//custom Modal
import Modal from "./Modal";
//custom utility class
import clsx from "clsx";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const { isOpen } = useContext(ModalContext);
  const { socket } = useContext(SocketContext);
  const { username: currentUser } = useContext(UserContext);

  const messageHandler = useCallback(({ message, username }) => {
    setChat((chat) => [...chat, { message: message, username: username }]);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", messageHandler);

      // Cleanup function
      return () => {
        socket.off("receive-message", messageHandler);
      };
    }
  }, [messageHandler, socket]);

  const sendChat = (event) => {
    event.preventDefault();
    socket.emit("send-message", { message: message, username: currentUser });
    setMessage("");
  };

  return (
    <>
      <main className="h-screen overflow-hidden">
        <div className="p-2 bg-zinc-900">
          <h1 className="text-lg font-bold p-2 flex justify-between">
            Chat App{" "}
            {!isOpen ? (
              <span className="text-sm text-emerald-500">
                You are connected as {currentUser}
              </span>
            ) : (
              <span className="text-sm text-red-500">
                You are not connected
              </span>
            )}
          </h1>
          <div className="flex grow bg-zinc-800 flex-col gap-4 p-2 h-screen overflow-scroll pb-32 no-scrollbar">
            {!isOpen &&
              chat.map(({ message, username }, index) => (
                <div
                  key={index}
                  className={clsx(
                    currentUser === username ? "self-end" : "self-start",
                    "flex items-center relative"
                  )}
                >
                  <span
                    className={clsx(
                      currentUser === username
                        ? "-right-2 bg-emerald-600"
                        : "-left-2 bg-slate-600",
                      "absolute -bottom-3 rounded-full h-6 w-6 flex items-center justify-center  text-white font-bold text-xs"
                    )}
                  >
                    {username.slice(0, 1)}
                  </span>
                  <span
                    className={clsx(
                      currentUser === username
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-600 text-white",
                      "px-4 py-2  rounded-lg inline-block w-fit text-sm font-semibold"
                    )}
                  >
                    {message}
                  </span>
                </div>
              ))}
          </div>
          <form
            className="flex gap-4 w-full justify-between fixed bottom-0 px-3 py-2 bg-black overflow-y-hidden"
            onSubmit={sendChat}
          >
            <div className="relative w-full">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                autoComplete="off"
                placeholder="Enter your message"
                className="
        text-slate-200
        placeholder:text-zinc-400
        placeholder:opacity-70
        font-light
        text-sm
        p-3
        pr-10
        bg-[#212432]
        w-full 
        rounded-lg
        focus:outline-none
      "
              />
            </div>
            <button
              className="px-3 py-2 bg-sky-700 font-bold rounded-lg hover:bg-sky-900 transition-all ease-in-out"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </main>
      <Modal />
    </>
  );
};

export default Chat;
