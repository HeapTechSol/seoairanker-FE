import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { convertFirstCharToCapital, getElements, hasClass, toggleCSSClass, toggleCSSClasses } from '@/utils/helper'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Avatar from '@/components/Avatar/Avatar'
import Typography from '@/components/Typography/Typography'
import Dropdown, { Option } from '@/components/Dropdown/Dropdown'
import NotificationBadge from '@/components/NotificationBadge/NotificationBadge'
import NotificationContainer from '@/components/NotificationContainer/NotificationContainer'

import { IoIosArrowDown } from 'react-icons/io'
import { EXACT_ROUTES } from '@/constant/routes'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaRegUser, FaRegBell } from 'react-icons/fa'

import { SEOAIRankerIcon } from '@/assets/icons/svgs'

import { useAppSelector } from '@/api/store'
import { setTheme, setUser } from '@/container/auth/authSlice'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './TopBar.scss'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

const { LOGIN, SIGNUP, PROFILE_PAGE } = EXACT_ROUTES

const TopBar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { getNotificationList, getNotificationLoading, notificationsData, handleReadNotification } = useHandleSitesLogic()

  const user = useAppSelector((state) => state.auth.user)
  const theme = useAppSelector((state) => state.auth.theme)

  const sidebarToggleHandler = () => {
    if (sidebarRef.current) {
      const subMenuList = getElements(sidebarRef.current, 'submenu-list')
      if (hasClass(sidebarRef.current, 'collapsed')) {
        toggleCSSClass(sidebarRef.current, 'collapsed', 'remove')
        toggleCSSClasses(subMenuList, 'submenu-collapsed', 'remove')
      } else {
        if (hasClass(sidebarRef.current, 'minimized')) {
          if (hasClass(sidebarRef.current, 'overlay')) return toggleCSSClass(sidebarRef.current, 'overlay', 'remove')
          return toggleCSSClass(sidebarRef.current, 'overlay', 'add')
        }
        toggleCSSClass(sidebarRef.current, 'collapsed', 'add')
        toggleCSSClasses(subMenuList, 'submenu-collapsed', 'add')
      }
    }
  }

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

  const lines = Array.from({ length: 5 }, (_, index) => <div key={index} className="line no-pointer"></div>)

  const handleSelect = (option: { id: number; name: string | JSX.Element | React.ReactNode }) => {
    console.log('Selected option:', option)
  }

  const users = [
    {
      id: 1,
      name: (
        <Flex align="center" gap={6} onClick={() => navigate(`${PROFILE_PAGE}/${user?.user?.id}`)}>
          <Avatar size={'large'} fallback={<FaRegUser />} src={user?.user?.profileImage} />
          <Flex vertical justify="between" gap={6}>
            <Typography text={`${user?.user?.firstName} ${user?.user?.lastName}`} size="lg" className="user-name" />
            <Typography text={user?.user?.email} size="lg" />
          </Flex>
        </Flex>
      ),
    },
    {
      id: 2,
      name: (
        <Flex align="center" justify="center" gap={6}>
          <ThemeSwitcher onClick={handleThemeSwitching} value={theme == 'dark'} />
        </Flex>
      ),
    },
    {
      id: 2,
      onClick: () => {
        dispatch(setUser(null))
        navigate(LOGIN)
      },
      name: (
        <Button size="md" color="common" type="borderRadius" variant="text" StartIcon={<IoLogOutOutline />}>
          Log out
        </Button>
      ),
    },
  ]

  const handleNotificationClick = async (id: string) => {
    await handleReadNotification({ id })
  }

  const notificationList = notificationsData?.data?.map((item) => ({
    id: Number(item?.id),
    onClick: () => (!item.read ? handleNotificationClick(item.id) : null),
    name: (
      <NotificationContainer
        description={item?.message || ''}
        title={item?.title || ''}
        isRead={item?.read || false}
        key={item?.id}
        date={item?.timestamp || ''}
      />
    ),
  })) as Option<number>[]

  const isToggle = false

  const handleScrollNotifications = async () => {
    if ((notificationsData?.data?.length || 0) < (notificationsData?.total || 0)) {
      await getNotificationList({ page: (notificationsData?.page || 1) + 1, per_page: 10 })
    }
  }

  useEffect(() => {
    if (user?.user.id) getNotificationList({ page: 1, per_page: 10 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="topbar-container">
      {isToggle && (
        <div className="humbarger-icon" onClick={sidebarToggleHandler}>
          {lines}
        </div>
      )}
      <div className="topbar-content">
        <Flex align="center" justify="between">
          <Flex align="center" gap={8}>
            <div className="brand-icon" title="SEO AI Ranker icon" onClick={() => navigate('/')}>
              {SEOAIRankerIcon}
            </div>
          </Flex>
          <Flex justify="end" gap={16}>
            {!user?.access_token && (
              <>
                <Button type="borderRadius" color="info" variant="text" StartIcon={<FaRegUser />} onClick={() => navigate(LOGIN)}>
                  Login
                </Button>
                <Button type="borderRadius" onClick={() => navigate(SIGNUP)}>
                  Sign Up
                </Button>
              </>
            )}
            {user?.access_token && (
              <Flex align="center" gap={32} justify="end">
                <Dropdown
                  options={notificationList}
                  onSelect={handleSelect}
                  className="notification-dropdown-list"
                  scrollLoading={getNotificationLoading}
                  onScroll={handleScrollNotifications}
                >
                  <NotificationBadge count={notificationsData?.unread_count || 0} maxCount={100} icon={<FaRegBell />} />
                </Dropdown>
                <Dropdown options={users} onSelect={handleSelect} className="profile-dropdown-list">
                  <div className="profile-dropdown-list__header">
                    <Avatar size={'medium'} fallback={<FaRegUser />} src={user?.user?.profileImage} onClick={() => null} />
                    <span>{convertFirstCharToCapital(user?.user?.firstName || '')}</span>
                    <IoIosArrowDown />
                  </div>
                </Dropdown>
              </Flex>
            )}
          </Flex>
        </Flex>
      </div>
    </div>
  )
}

export default TopBar
