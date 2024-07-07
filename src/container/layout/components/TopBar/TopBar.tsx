import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getElements, hasClass, toggleCSSClass, toggleCSSClasses } from '@/utils/helper'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Avatar from '@/components/Avatar/Avatar'
import Dropdown from '@/components/Dropdown/Dropdown'
import Typography from '@/components/Typography/Typography'
import NotificationBadge from '@/components/NotificationBadge/NotificationBadge'

import { EXACT_ROUTES } from '@/constant/routes'
import SeodeIcon from '@/assets/images/seode.png'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaRegUser, FaRegBell } from 'react-icons/fa'

import { useAppSelector } from '@/api/store'
import { setUser } from '@/container/auth/authSlice'

import './TopBar.scss'

const { LOGIN, SIGNUP } = EXACT_ROUTES

const TopBar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useAppSelector((state) => state.auth.user)

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

  const lines = Array.from({ length: 5 }, (_, index) => <div key={index} className="line no-pointer"></div>)

  const handleSelect = (option: { id: number; name: string | JSX.Element | React.ReactNode }) => {
    console.log('Selected option:', option)
  }

  const users = [
    {
      id: 2,
      name: (
        <Flex align="center" gap={6}>
          <Avatar size={'large'} fallback={<FaRegUser />} src={user?.user?.profileImage} />
          <Flex vertical justify="between" gap={6}>
            <Typography text={`${user?.user?.firstName} ${user?.user?.lastName}`} size="sm" />
            <Typography text={user?.user?.email} size="sm" />
          </Flex>
        </Flex>
      ),
    },
    {
      id: 3,
      onClick: () => {
        dispatch(setUser(null))
        navigate(LOGIN)
      },
      name: (
        <Button size="sm" color="common" type="borderRadius" variant="text" EndIcon={<IoLogOutOutline />}>
          Log out
        </Button>
      ),
    },
  ]

  const isToggle = false

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
            <img height={40} src={SeodeIcon} alt="" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="pointer-icon-fill" />
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
                <Dropdown options={[]} onSelect={handleSelect}>
                  <NotificationBadge count={10} maxCount={100} icon={<FaRegBell />} />
                </Dropdown>
                <Dropdown options={users} onSelect={handleSelect}>
                  <Avatar size={'small'} fallback={<FaRegUser />} src={user?.user?.profileImage} />
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
