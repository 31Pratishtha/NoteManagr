import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

export default function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = notes;

    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : console.log("errorHere");

    content = (
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
}
