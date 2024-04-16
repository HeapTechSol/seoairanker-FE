import { menuTypes } from "@/container/layout/components/Menu/types";

export const sidebarMenuData: menuTypes[] = [
  {
    name: "Dashboard",
    icon: "icon",
    path: "/dashboard",
    children: [
      {
        name: "About",
        path: "/about",
        children: [
          { name: "Old Bank", path: "dashboard/about/oldbank" },
          { name: "New Bank", path: "dashboard/about/newbank" },
        ],
      },
      {
        name: "Contact",
        path: "/contact",
        children: [
          { name: "Old Bank", path: "dashboard/contact/oldbank" },
          { name: "New Bank", path: "dashboard/contact/newcontact" },
        ],
      },
    ],
  },
  { name: "Login", path: "/login", icon: "icon" },
];
