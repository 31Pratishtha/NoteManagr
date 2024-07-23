import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const content = (
    <section>
      <p></p>
      <h1>Welcome !</h1>
      <p>
        <Link to={"/dash/notes"}>View Notes</Link>
      </p>
      <p>
        <Link to={"/dash/notes/new"}>Add new note</Link>
      </p>
      <p>
        <Link to={"/dash/users"}>View Users</Link>
      </p>
      <p>
        <Link to={"/dash/users/new"}>Add new user</Link>
      </p>
    </section>
  );
  return content;
}
