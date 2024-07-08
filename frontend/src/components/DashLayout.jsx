import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div>
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
