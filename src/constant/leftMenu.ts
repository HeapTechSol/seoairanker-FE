import { menuTypes } from "@/container/layout/components/Menu/types";
import { EXACT_ROUTES, SITES, BILLING } from "./routes";
import { LocationIcon, MaleHeadIcon, SettingIcon } from "@/assets/icons/svgs";

const {
  ADD_SITE,
  SITES_PAGES,
  RECOMMENDATIONS,
  SITES_DASHBOARD,
  SITE_ACCESS_KEYS,
  ADD_SITES_NEW_KEYWORDS,

  CHECKOUT,
  PLANS,
  BILLING_DETAIL,
  PAYMENT_HISTORY,
  UPCOMING_INVOICES,

  LOGIN
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
        name: "Site Pages",
        path: SITES_PAGES,
      },
      {
        name: "Site Recommendations",
        path: RECOMMENDATIONS,
      },
      {
        name: "Site's Dashboard",
        path: SITES_DASHBOARD,
      },
      {
        name: "New Keywords",
        path: ADD_SITES_NEW_KEYWORDS,
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
        name: "Checkout",
        path: CHECKOUT,
      },
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
  { name: "Login", path: LOGIN, icon: MaleHeadIcon},
];
