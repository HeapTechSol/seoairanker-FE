import { menuTypes } from '@/container/layout/components/Menu/types'
import { EXACT_ROUTES, BILLING } from './routes'

import { BiDetail } from 'react-icons/bi'
import { TbInvoice } from 'react-icons/tb'
import { PiBankLight } from 'react-icons/pi'
import { RxDashboard } from 'react-icons/rx'
import { BsClockHistory } from 'react-icons/bs'
import { MdOutlineAddToQueue } from 'react-icons/md'
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoKeyOutline, IoPricetagOutline } from 'react-icons/io5'

const {
  ADD_SITE,
  SITES_DASHBOARD,
  SITE_ACCESS_KEYS,

  PLANS,
  BILLING_DETAIL,
  PAYMENT_HISTORY,
  UPCOMING_INVOICES,
} = EXACT_ROUTES

export const sidebarMenuData: menuTypes[] = [
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
  {
    name: 'API Keys',
    icon: <IoKeyOutline />,
    path: SITE_ACCESS_KEYS,
  },
  {
    name: 'Reports',
    icon: <HiOutlineDocumentReport />,
    path: SITE_ACCESS_KEYS,
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
      {
        name: 'Upcoming Invoices',
        path: UPCOMING_INVOICES,
        icon: <TbInvoice />,
      },
    ],
  },
]
