import { EXACT_ROUTES, BILLING, SITES } from './routes'

import { BiDetail } from 'react-icons/bi'
// import { TbInvoice } from 'react-icons/tb'
import { PiBankLight } from 'react-icons/pi'
import { RxDashboard } from 'react-icons/rx'
import { BsClockHistory } from 'react-icons/bs'
import { MdOutlineAddToQueue, MdOutlineSchema } from 'react-icons/md'
import { IoPricetagOutline, IoSettingsOutline } from 'react-icons/io5'

const {
  ADD_SITE,
  SITES_DASHBOARD,
  // SITE_ACCESS_KEYS,
  PLANS,
  BILLING_DETAIL,
  PAYMENT_HISTORY,
  SITE_DETAILS_PAGE,
  // UPCOMING_INVOICES,
} = EXACT_ROUTES

const { SITE_SETTING_PAGE, SITE_SCHEMA_PAGE } = SITES

export const sidebarMenuData = (id: string) => [
  {
    name: "Site's Dashboard",
    icon: <RxDashboard />,
    path: SITES_DASHBOARD,
  },
  {
    name: 'Add Site',
    icon: <MdOutlineAddToQueue />,
    path: ADD_SITE,
  },
  // {
  //   name: 'API Keys',
  //   icon: <IoKeyOutline />,
  //   path: SITE_ACCESS_KEYS,
  // },
  {
    hide: !id,
    name: 'Setting',
    icon: <IoSettingsOutline />,
    path: `${SITE_DETAILS_PAGE}/${id}/${SITE_SETTING_PAGE}`,
  },
  {
    hide: !id,
    name: 'Schema',
    icon: <MdOutlineSchema />,
    path: `${SITE_DETAILS_PAGE}/${id}/${SITE_SCHEMA_PAGE}`,
  },
  {
    name: 'Billing',
    icon: <PiBankLight />,
    path: BILLING.BASE,
    children: [
      {
        name: 'Plans',
        path: PLANS,
        icon: <IoPricetagOutline />,
      },
      {
        name: 'Payment History',
        path: PAYMENT_HISTORY,
        icon: <BsClockHistory />,
      },
      {
        name: 'Billing Detail',
        path: BILLING_DETAIL,
        icon: <BiDetail />,
      },
      // {
      //   name: 'Upcoming Invoices',
      //   path: UPCOMING_INVOICES,
      //   icon: <TbInvoice />,
      // },
    ],
  },
]
