import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Flex from '@/components/Flex'
import Accordion from '@/components/Accordion'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

import { menuTypes } from '../Menu/types'
import { sidebarMenuData } from '@/constant/leftMenu'
import { allowedRoutesWithoutSubscription } from '@/constant/constant'

import { useAppSelector } from '@/api/store'
import { setTheme } from '@/container/auth/authSlice'


import './Sidebar.scss'



const Sidebar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isUserSubscribed = useAppSelector((state) => state.auth.user?.isActiveSubscription)

  const theme = useAppSelector((state) => state.auth.theme)

  const isLinkDisabled = (path: string) => {
    return !isUserSubscribed && !allowedRoutesWithoutSubscription.includes(path)
  }

  const menuChildren = (menu: menuTypes[]) => {
    return (
      <Flex vertical gap={8}>
        {menu.map((item) => (
          <>{menuLink(item)}</>
        ))}
      </Flex>
    )
  }

  const menuLink = (menu: menuTypes) => (
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
  )

  const menuItem = (menu: menuTypes) => (
    <Flex gap={8} align="center" className="sidebar-container__menu__item">
      {menu.icon}
      <span className="sidebar-container__menu__link__title">{menu.name}</span>
    </Flex>
  )

  const menuList = sidebarMenuData.map((menu, index) => (
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

  const handleThemeSwitching = (isDark: boolean) => {
    if (isDark) {
      dispatch(setTheme('dark'))
      document.querySelector('body')?.classList.remove('light')
      document.querySelector('body')?.classList.add('dark')
    } else {
      dispatch(setTheme('light'))
      document.querySelector('body')?.classList.remove('dark')
      document.querySelector('body')?.classList.add('light')
    }
  }

  return (
    <div className="sidebar-container" ref={sidebarRef}>
      <Flex vertical gap={16} className="sidebar-container__menu">
        {menuList}
      </Flex>
      <ThemeSwitcher onClick={handleThemeSwitching} value={theme == 'dark'} />
    </div>
  )
}

export default Sidebar
