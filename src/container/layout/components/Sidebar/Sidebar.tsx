import React, { useRef } from 'react';


import Menu from '../Menu/Menu';

import useHandleClickOutSide from '@/hooks/useHandleClickOutSide';

import { sidebarMenuData } from '@/constant/leftMenu';

import { menuClickHandler } from '@/utils/menuClickHandler';
import { getElements, toggleCSSClasses } from '@/utils/helper';

import './Sidebar.scss';

const Sidebar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useHandleClickOutSide(menuRef, () => {
    const htmlElements = getElements(menuRef.current as HTMLDivElement, 'open');
    toggleCSSClasses(htmlElements, 'open', 'remove');
  });

  const dropDownHandler = async (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement;
    if (menuRef && menuRef.current) {
      menuClickHandler(element, menuRef);
    }
  };

  const menuList = sidebarMenuData.map((menu, index) => (
    <Menu menu={menu} key={(menu.name as string) + index} clickHandler={dropDownHandler} index={String(index)} />
  ));

  return (
    <div className="sidebar-container" ref={sidebarRef}>
      <div ref={menuRef} className="sidebar-container-menu">
        {menuList}
      </div>
    </div>
  );
};

export default Sidebar;
