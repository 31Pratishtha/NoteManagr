import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "../tasks/tasksApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function NewTaskForm({ users }) {
  const navigate = useNavigate();

  const [addNewTask, { isSuccess, isError, error, isLoading }] =
    useAddNewTaskMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/tasks");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveTaskClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTask({ user: userId, title, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.username}
      </option>
    );
  });

  const content = (
    <>
      <p>{error?.data?.message}</p>
      <form action="" onSubmit={onSaveTaskClicked}>
        <div>
          <h2>New Task</h2>
          <div>
            <button disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={onTitleChanged} />

        <label htmlFor="text">Description:</label>
        <textarea
          id="text"
          value={text}
          onChange={onTextChanged}
        ></textarea>

        <label htmlFor="userId">Assigned To:</label>
        <select id="userId" value={userId} onChange={onUserIdChanged}>
          {options}
        </select>
      </form>
    </>
  );

  return content;
}
