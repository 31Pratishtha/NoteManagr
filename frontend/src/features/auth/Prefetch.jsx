import React, { useEffect } from "react";
import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

export default function Prefetch() {
  useEffect(() => {
    console.log("Subscribing");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(notesApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("Unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
}
