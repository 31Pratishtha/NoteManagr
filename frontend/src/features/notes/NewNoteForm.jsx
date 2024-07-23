import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "../notes/notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function NewNoteForm({ users }) {
  const navigate = useNavigate();

  const [addNewNote, { isSuccess, isError, error, isLoading }] =
    useAddNewNoteMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
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
      <form action="" onSubmit={onSaveNoteClicked}>
        <div>
          <h2>New Note</h2>
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
