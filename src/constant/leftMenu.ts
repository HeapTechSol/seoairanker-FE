import { menuTypes } from "@/container/layout/components/Menu/types";
import { LEAVE } from "./routes";

const { LEAVE_BALANCE, APPLY_LEAVE, PENDING_LEAVES } = LEAVE;

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
  {
    name: "Leave Management",
    icon: "icon",
    path: `${LEAVE_BALANCE} ${APPLY_LEAVE} ${PENDING_LEAVES}`,
    children: [
      { name: "Leave Balance", path: LEAVE_BALANCE },
      { name: "Apply Leave", path: APPLY_LEAVE },
      { name: "Pending Leaves ", path: PENDING_LEAVES },
    ],
  },
  { name: "Login", path: "/login", icon: "icon" },
];
