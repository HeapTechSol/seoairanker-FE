import { ClassMapperArgsTpyes } from './utilTypes';

export const classMapper = (...args: ClassMapperArgsTpyes[]) => {
  const classesObject = new Map();

  args.forEach((className: ClassMapperArgsTpyes) => {
    if (typeof className === 'string') !classesObject.has(className) && classesObject.set(className, true);

    if (typeof className === 'object')
      Object.entries(className).forEach(([key, value]) => {
        if (!value) return;
        classesObject.set(key, true);
      });
  });

  const classes: string[] = [];

  classesObject.forEach((_value, key) => classes.push(key));

  return classes.join(' ');
};

export const toggleCSSClasses = (elements: Element[], className: string, action: 'remove' | 'add') =>
  elements.forEach((item) => item?.classList[action](className));

export const toggleCSSClass = (element: Element | null, className: string, action: 'remove' | 'add') =>
  (element as Element).classList[action](className);

export const getMenuId = (menu: Element) => menu.id;

export const hasClass = (element: Element, className: string) => element.classList.contains(className);

export const filterById = (elements: Element[], id: string) => elements.filter((item) => !id?.includes(getMenuId(item)));

export const firstChild = (elements: Element[]) => elements.flatMap((item) => item.firstElementChild);

export const getElement = (element: Element, className: string) => (element ? element.querySelector(`.${className}`) : null);

export const getElements = (elements: Element, className: string) => Array.from(elements.querySelectorAll(`.${className}`));

export const filterByClassName = (elements: Element[], id: string) => {
  const elementsWithMatchedId = filterById(elements, id);
  return firstChild(elementsWithMatchedId);
};

export const filterByClassNameAndOpenClass = (arr: Element[], id: string) => {
  const elementsWithMatchedIdAndOpenClass = arr.filter(
    (item) => id?.includes(getMenuId(item)) && hasClass(item.firstElementChild as Element, 'open'),
  );
  return firstChild(elementsWithMatchedIdAndOpenClass);
};

export const accessElements = (menuRef: React.RefObject<HTMLDivElement>) => {
  const ref = menuRef.current as Element;
  const subMenus = getElements(ref, 'submenu');
  const menuItems = getElements(ref, 'menu-link');
  const elementsWithOpenClass = getElements(ref, 'open');
  const subMenusItems = getElements(ref, 'submenu-list-link');
  const subMenuItemWithActiveClass = getElement(ref, 'submenu-list-link.active');

  const subMenuWithActiveClass = subMenuItemWithActiveClass?.closest('.submenu');

  const subMenuHeadingWithActiveChild = getElement(subMenuWithActiveClass as Element, 'submenu-heading');

  return { subMenus, menuItems, elementsWithOpenClass, subMenusItems, subMenuHeadingWithActiveChild };
};

export const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export const arrayGeneratorWithRange = (start:number, end:number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};