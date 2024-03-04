import React from 'react';

import {
  accessElements,
  filterByClassName,
  filterByClassNameAndOpenClass,
  getMenuId,
  hasClass,
  toggleCSSClass,
  toggleCSSClasses,
} from './helper';

export const menuClickHandler = (element: Element, menuRef: React.RefObject<HTMLDivElement>) => {
  const { subMenus, menuItems, elementsWithOpenClass, subMenusItems, subMenuHeadingWithActiveChild } = accessElements(menuRef);

  const menuId = getMenuId(element.parentNode as HTMLDivElement);

  const subMenusItemsWithMatchedIds = filterByClassName(subMenus, menuId);

  const subMenuItemsWithActiveClass = filterByClassNameAndOpenClass(subMenus, menuId);

  if (hasClass(element, 'menu-link' || 'submenu-list-link')) {
    if (hasClass(element, 'open')) {
      toggleCSSClass(element, 'open', 'remove');
    } else {
      toggleCSSClasses(elementsWithOpenClass as Element[], 'open', 'remove');
      toggleCSSClass(element, 'open', 'add');
    }
  } else {
    if (hasClass(element, 'open')) {
      toggleCSSClass(element, 'open', 'remove');
    } else {
      toggleCSSClasses(subMenusItemsWithMatchedIds as Element[], 'open', 'remove');
      toggleCSSClasses(menuItems, 'open', 'remove');
      toggleCSSClasses(subMenusItems, 'open', 'remove');
      toggleCSSClass(element, 'open', 'add');

      if (subMenuHeadingWithActiveChild) {
        toggleCSSClass(subMenuHeadingWithActiveChild, 'open', 'add');
        toggleCSSClass(subMenuHeadingWithActiveChild.nextSibling as HTMLDivElement, 'nested-list', 'add');
      }
    }
  }
  if (element.nextElementSibling) {
    if (!subMenuItemsWithActiveClass.length) {
      toggleCSSClass(element.nextSibling as HTMLDivElement, 'nested-list', 'remove');
      (element.nextSibling as HTMLDivElement).style.marginTop = `-35px`;
    } else {
      toggleCSSClass(element.nextSibling as HTMLDivElement, 'nested-list', 'add');
    }
  }
};
