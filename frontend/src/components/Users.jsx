import { useState } from "react";
import { patchUser, getAllUsers } from "../services";

function Users() {
  const [textInput, setTextInput] = useState({
    uid: "",
    username: "",
  });
  const [users, setUsers] = useState([]);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    if (textInput.uid && textInput.username) {
      patchUser({ id: textInput.uid, username: textInput.username })
        .then(() => {
          return getAllUsers();
        })
        .then(({ data: users }) => {
          setUsers(users);
        });
    }
    setTextInput((prev) => ({ ...prev, uid: "", username: "" }));
    event.preventDefault();
  };

  return (
    <div className="px-6">
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">UID</span>
            <input
              className="mt-1 block w-full"
              type="text"
              name="uid"
              value={textInput.uid}
              onChange={handleTextInputChange}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Username</span>
            <input
              className="mt-1 block w-full"
              type="text"
              name="username"
              value={textInput.username}
              onChange={handleTextInputChange}
            />
          </label>
          <input
            className="mt-1 block w-full bg-transparent hover:bg-blue-50 focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 rounded"
            type="submit"
            value="Patch"
          />
        </div>
        <button
          className="mt-1 block w-full bg-transparent hover:bg-blue-50 focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 rounded"
          onClick={() => {
            getAllUsers().then(({ data: users }) => {
              setUsers(users);
            });
          }}
        >
          Refresh
        </button>
      </form>
      {users.map(({ username, birthdat }, index) => (
        <div key={index}>{username}</div>
      ))}
    </div>
  );
}

export default Users;
