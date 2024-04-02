// import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

// import Topbar from '../components/Topbar/Topbar';
// import Sidebar from '../components/Sidebar/Sidebar';

import './Layout.scss';

const Layout = () => {
  // const sidebarRef = useRef<HTMLDivElement>(null)
  return (
    <div className="layout-container">
      {/* <Sidebar sidebarRef={sidebarRef}/> */}
      <div className="layout-right-section">
        {/* <Topbar sidebarRef={sidebarRef}/> */}
        <div className="layout-right-section-menu">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
