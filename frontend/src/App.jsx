import { Outlet } from "react-router-dom";
import useTitle from "./hooks/useTitle";

function App() {
  // useTitle('WindzNotesMgr')
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
