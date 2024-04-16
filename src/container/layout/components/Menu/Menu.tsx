import { Link, useLocation } from "react-router-dom";

import { MenuPropsTypes, menuTypes } from "./types";

import HeartIcon from "@/assets/icons/heart.svg";

import { classMapper } from "@/utils/helper";

import "./Menu.scss";

const Menu = ({ menu, index, clickHandler, className }: MenuPropsTypes) => {
  const { pathname } = useLocation();

  const isPathMatched = (path: string) => pathname.includes(path);
  const subMenuHeadingClass = classMapper("submenu-heading", {
    active: isPathMatched(menu.path) && !className,
  });
  const menuItemsClass = classMapper("menu-link", {
    active: isPathMatched(menu.path),
  });
  const menuClass = classMapper(`sidebar-menu-container`, {
    [className as string]: className,
    menu: !className,
  });

  const subMenuHeading = (
    <div className={subMenuHeadingClass} onClick={clickHandler}>
      {menu.icon && <img src={HeartIcon} className="no-pointer" />}
      <span className="submenu-heading-title no-pointer">
        {menu.name as string}
      </span>
      {menu.children && <span className="dropdown-arrow no-pointer"></span>}
    </div>
  );

  const nestedSubMenu = (subMenu: menuTypes, idx: number) => (
    <Menu
      menu={subMenu}
      className="nested-submenu"
      clickHandler={clickHandler}
      index={`${index}${idx}`}
    />
  );

  const subMenuItem = (subMenu: menuTypes) => (
    <Link
      to={subMenu.path}
      className={classMapper("submenu-list-link", {
        active: isPathMatched(subMenu.path),
      })}
      onClick={clickHandler}
    >
      {subMenu.name as string}
    </Link>
  );

  const subMenuItems = (subMenu: menuTypes, idx: number) =>
    subMenu.children ? nestedSubMenu(subMenu, idx) : subMenuItem(subMenu);

  const subMenuList = menu.children?.map((subMenu, idx) => (
    <div key={(subMenu.name as string) + idx}>{subMenuItems(subMenu, idx)}</div>
  ));

  const subMenuListContainer = (
    <div className="submenu-list">{subMenuList}</div>
  );

  const subMenu = (
    <div id={`${index}`} className={`submenu`}>
      {subMenuHeading}
      {subMenuListContainer}
    </div>
  );

  const menuItem = (
    <Link to={menu.path} className={menuItemsClass} onClick={clickHandler}>
      {menu.icon && <img src={HeartIcon} className="no-pointer" />}
      <span className="menu-link-title no-pointer">{menu.name as string}</span>
    </Link>
  );

  const menuItems = menu.children ? subMenu : menuItem;

  return <div className={menuClass}>{menuItems}</div>;
};

export default Menu;
