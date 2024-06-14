import { menuTypes } from "@/container/layout/components/Menu/types";
import { EXACT_ROUTES, SITES, BILLING } from "./routes";
import { LocationIcon, SettingIcon } from "@/assets/icons/svgs";

const {
  ADD_SITE,
  SITES_DASHBOARD,
  SITE_ACCESS_KEYS,

  PLANS,
  BILLING_DETAIL,
  PAYMENT_HISTORY,
  UPCOMING_INVOICES,
} = EXACT_ROUTES;

export const sidebarMenuData: menuTypes[] = [
  {
    name: "Sites",
    icon: LocationIcon,
    path: SITES.BASE,
    children: [
      {
        name: "Add Site",
        path: ADD_SITE,
      },
      {
        name: "Site's Dashboard",
        path: SITES_DASHBOARD,
      },
      {
        name: "API Keys",
        path: SITE_ACCESS_KEYS,
      },
    ],
  },
  {
    name: "Billing",
    icon: SettingIcon,
    path: BILLING.BASE,
    children: [
      {
        name: "Plans",
        path: PLANS,
      },
      {
        name: "Payment History",
        path: PAYMENT_HISTORY,
      },
      {
        name: "Billing Detail",
        path: BILLING_DETAIL,
      },
      {
        name: "Upcoming Invoices",
        path: UPCOMING_INVOICES,
      },
    ],
  },
];
