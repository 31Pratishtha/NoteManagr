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
        <Link to={"/dash/users"}>View User settings</Link>
      </p>
    </section>
  );
  return content;
}
