import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

export default function User({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dash/users/${userId}`);
  };
  const userRolesString = user.roles.toString().replaceAll(",", ", ");

  if (user) {
    return (
      <tr>
        <td>{user.username}</td>
        <td>{userRolesString}</td>
        <td>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
