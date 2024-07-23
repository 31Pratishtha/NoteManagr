import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles.js";

const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%&*]{4,12}$/;

export default function NewUserForm() {
  const navigate = useNavigate();

  const [addNewUser, { isSuccess, isError, error, isLoading }] =
    useAddNewUserMutation();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validpassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

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

  const canSave =
    [validUsername, validpassword, roles.length].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const content = (
    <>
      <p>{error?.data?.message}</p>
      <form onSubmit={onSaveUserClicked}>
        <div>
          <h2>New User</h2>
          <div>
            <button disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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

        <label htmlFor="roles">
          Assigned Roles:
        </label>
        <select size="3" name="roles" multiple={true} value={roles} onChange={onRolesChanged}>
          {options}
        </select>
      </form>
    </>
  );

  return content;
}
