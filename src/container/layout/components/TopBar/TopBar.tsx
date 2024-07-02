import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getElements, hasClass, toggleCSSClass, toggleCSSClasses } from '@/utils/helper'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Typography from '@/components/Typography/Typography'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

import { EXACT_ROUTES } from '@/constant/routes'
import { MaleHeadIcon } from '@/assets/icons/svgs'
import SeodeIcon from '@/assets/images/seode.png'

import { useAppSelector } from '@/api/store'
import { setTheme, setUser } from '@/container/auth/authSlice'

import './TopBar.scss'
import Dropdown from '@/components/Dropdown/Dropdown'
import Avatar from '@/components/Avatar/Avatar'

const { LOGIN, SIGNUP, PLANS } = EXACT_ROUTES

const TopBar = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      id: 2,
      name: (
        <Flex align="center" gap={6}>
          <Avatar size={'large'} fallback={user?.user?.firstName} src={user?.user?.profileImage} />
          <Flex vertical justify="between" gap={6}>
            <Typography text={`${user?.user?.firstName} ${user?.user?.lastName}`} size="sm" />
            <Typography text={user?.user?.email} size="sm" />
          </Flex>
        </Flex>
      ),
    },
    {
      id: 3,
      name: <Typography text="Logout" size="lg" onClick={() => dispatch(setUser(null))} />,
    },
  ]

  return (
    <div className="topbar-container container-bg">
      {user?.access_token && (
        <div className="humbarger-icon" onClick={sidebarToggleHandler}>
          {lines}
        </div>
      )}
      <div className="topbar-content">
        <Flex align="center" justify="between">
          <Flex align="center" gap={8}>
            <img height={40} src={SeodeIcon} alt="" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="pointer-icon-fill" />
          </Flex>
          <Flex justify="center" align="center" gap={16}>
            <Link to={PLANS}>
              <Typography text="Pricing" size="lg" />
            </Link>
          </Flex>
          <Flex justify="end" gap={16}>
            {!user?.access_token && (
              <>
                <Button type="borderRadius" color="info" variant="text" StartIcon={MaleHeadIcon} onClick={() => navigate(LOGIN)}>
                  Login
                </Button>
                <Button type="borderRadius" onClick={() => navigate(SIGNUP)}>
                  Sign Up
                </Button>
              </>
            )}
            {user?.access_token && (
              <Flex align="center" gap={32} justify="end">
                <ThemeSwitcher onClick={handleThemeSwitching} value={theme == 'dark'} />
                <Dropdown options={users} onSelect={handleSelect}>
                  <Avatar shape="square" fallback={user?.user?.firstName} src={user?.user?.profileImage} />
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
