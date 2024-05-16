import { useRef } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";

import "./Layout.scss";

const Layout = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isLogged = true;

  return (
    <div className="layout-container">
      {isLogged && <Sidebar sidebarRef={sidebarRef} />}
      <div className="layout-right-section">
        <TopBar sidebarRef={sidebarRef} />
        <div className="layout-right-section-menu">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
