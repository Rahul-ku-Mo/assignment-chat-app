import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";

const Modal = () => {
  const { username, setUsername } = useContext(UserContext);

  const { isOpen, closeModal } = useContext(ModalContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}
      <dialog
        open={isOpen}
        className="top-1/4 z-20 translate-y-1/2 bg-slate-800 rounded-lg h-48 max-w-md w-full"
      >
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-2 p-2 items-center h-full justify-between"
        >
          <div className="flex flex-col items-center gap-2 w-full max-w-sm">
            <label className="text-2xl font-bold">Who are you?</label>
            <input
              className="outline-none p-2 rounded-md mx-2 text-sm bg-slate-600 w-full max-w-sm"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <button
            className="px-4 py-2 text-sm bg-slate-600 rounded-md hover:bg-slate-900 transition-all ease-in-out w-fit mx-auto"
            type="submit"
          >
            Submit
          </button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
