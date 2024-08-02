import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import PulseLoader from 'react-spinners/PulseLoader'

export default function NewNote() {
  const users = useSelector(selectAllUsers);

	if (!users?.length) return <PulseLoader color="#FFF" />

	const content = <NewNoteForm users={users} />

	return content
}
