import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

export default function NewNote() {
  const users = useSelector(selectAllUsers);

  if(!users?.length) return <p>Not Currently Available</p>

  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
}
