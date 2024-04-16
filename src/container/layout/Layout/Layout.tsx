import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";

import useResizeObserver from "@/hooks/useResizeOberver";

import { toggleCSSClass } from "@/utils/helper";

import "./Layout.scss";

const Layout = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { width } = useResizeObserver();

  useEffect(() => {
    if (width < 1300 && width > 700) {
      toggleCSSClass(sidebarRef.current, "minimized", "remove");
      toggleCSSClass(sidebarRef.current, "collapsed", "add");
    }
    if (width < 700 && width > 0) {
      toggleCSSClass(sidebarRef.current, "minimized", "add");
      toggleCSSClass(sidebarRef.current, "collapsed", "remove");
    }
  }, [width]);

  const isLogged = false;

  return (
    <div className="layout-container">
      {isLogged && <Sidebar sidebarRef={sidebarRef} />}
      <div className="layout-right-section">
        <Topbar sidebarRef={sidebarRef} />
        <div className="layout-right-section-menu">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
