import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useAppSelector } from './api/store'

import { routes } from './routes/constant'

import useBillingHandling from './container/billing/hooks/useBillingHandling'

const App = () => {
  const theme = useAppSelector((state) => state.auth.theme)
  const userInfo = useAppSelector((state) => state.auth.user?.user)

  const { getUserQuotas } = useBillingHandling()

  useEffect(() => {
    if (userInfo?.id) getUserQuotas({ user_id: Number(userInfo?.id) })
  }, [])

  return (
    <div className={`app-container ${theme || 'light'}`}>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
