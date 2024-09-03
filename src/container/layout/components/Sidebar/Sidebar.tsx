import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Accordion from '@/components/Accordion'

import { menuTypes } from '../Menu/types'
import { sidebarMenuData } from '@/constant/leftMenu'
import { allowedRoutesWithoutSubscription } from '@/constant/constant'

import { useAppSelector } from '@/api/store'

import './Sidebar.scss'

const Sidebar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams()

  const isUserSubscribed = useAppSelector((state) => state.auth.user?.isActiveSubscription)

  const isLinkDisabled = (path: string) => {
    return !isUserSubscribed && !allowedRoutesWithoutSubscription.includes(path)
  }

  const menuChildren = (menu: menuTypes[]) => {
    return (
      <Flex vertical gap={8}>
        {menu.map((item, index) => (
          <React.Fragment key={`${index}-left-menu`}>{menuLink(item)}</React.Fragment>
        ))}
      </Flex>
    )
  }

  const menuLink = (menu: menuTypes) => (
    <>
      {menu?.hide ? null : (
        <Flex
          align="center"
          gap={8}
          className={`sidebar-container__menu__link ${menu.path === pathname ? 'active' : ''} ${isLinkDisabled(menu.path) ? 'disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            navigate(menu.path)
          }}
        >
          {menu.icon}
          <span className="sidebar-container__menu__link__title">{menu.name}</span>
        </Flex>
      )}
    </>
  )

  const menuItem = (menu: menuTypes) => (
    <Flex gap={8} align="center" className="sidebar-container__menu__item">
      {menu.icon}
      <span className="sidebar-container__menu__link__title">{menu.name}</span>
    </Flex>
  )

  const menuList = sidebarMenuData((pathname?.includes('sites') && id) || '')?.map((menu, index) => (
    <React.Fragment key={`${index}-SidebarMenu`}>
      {menu.children ? (
        <Accordion
          className={`sidebar-container__menu__sub-menu ${menu.children?.map((item) => item.path).includes(pathname) ? 'active' : ''}`}
          title={menuItem(menu)}
          description={menuChildren(menu.children)}
        />
      ) : (
        menuLink(menu)
      )}
    </React.Fragment>
  ))


  return (
    <div className="sidebar-container" ref={sidebarRef}>
      <Flex vertical gap={16} className="sidebar-container__menu">
        {menuList}
      </Flex>
    </div>
  )
}

export default Sidebar
