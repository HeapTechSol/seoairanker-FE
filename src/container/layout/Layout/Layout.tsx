import { useRef } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";

import { useAppSelector } from "@/api/store";

import "./Layout.scss";

const Layout = () => {
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="layout-container dark">
      {user?.access_token && <Sidebar sidebarRef={sidebarRef} />}
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
