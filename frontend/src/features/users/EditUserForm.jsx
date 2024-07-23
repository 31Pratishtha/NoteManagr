import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles.js";

const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Z0-9!@#$%&*]{4,12}$/;

export default function EditUserForm({ user }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validpassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUserNameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const onActiveChanged = () => setActive((prev) => !prev);

  let canSave;
  if (password)
    canSave =
      [roles.length, validUsername, validpassword].every(Boolean) && !isLoading;
  else canSave = [roles.length, validUsername].every(Boolean) && !isLoading;

  const onUpdateUserClicked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p>{errContent}</p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit User</h2>
          <div>
            <button onClick={onUpdateUserClicked} disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button onClick={onDeleteUserClicked}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUserNameChanged}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label htmlFor="active">Active: </label>
        <input type="checkbox" checked={active} onChange={onActiveChanged} />

        <label htmlFor="roles">Assigned Roles:</label>
        <select size="3" name="roles" multiple={true} value={roles} onChange={onRolesChanged}>
          {options}
        </select>
      </form>
    </>
  );

  return content;
}
