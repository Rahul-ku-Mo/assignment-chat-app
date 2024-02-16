import Chat from "./components/Chat";
import { ModalContextProvider } from "./context/ModalContext";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <ModalContextProvider>
          <Chat />
        </ModalContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
};

export default App;
