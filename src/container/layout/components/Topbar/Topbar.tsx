import { getElements, hasClass, toggleCSSClass, toggleCSSClasses } from '@/utils/helper';

import './Topbar.scss';

const Topbar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const sidebarToggleHandler = () => {
    if (sidebarRef.current) {
      const subMenuList = getElements(sidebarRef.current, 'submenu-list');
      if (hasClass(sidebarRef.current, 'collapsed')) {
        toggleCSSClass(sidebarRef.current, 'collapsed', 'remove');
        toggleCSSClasses(subMenuList, 'submenu-collapsed', 'remove');
      } else {
        toggleCSSClass(sidebarRef.current, 'collapsed', 'add');
        toggleCSSClasses(subMenuList, 'submenu-collapsed', 'add');
      }
    }
  };

  const lines = Array.from({ length: 5 }, (_, index) => <div key={index} className="line no-pointer"></div>);

  return (
    <div className="topbar-container">
      <div className="humbarger-icon" onClick={sidebarToggleHandler}>
        {lines}
      </div>
    </div>
  );
};

export default Topbar;
