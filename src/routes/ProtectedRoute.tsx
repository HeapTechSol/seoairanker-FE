import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/api/store'

import { EXACT_ROUTES } from '@/constant/routes'

// import { allowedRoutesWithoutSubscription } from '@/constant/constant'

const { LOGIN } = EXACT_ROUTES

const ProtectedRoute = ({ children }: { children: React.ReactNode | JSX.Element }) => {
  // const {pathname} = useLocation()
  const isAuthenticated = useAppSelector((state) => state.auth.user?.access_token)
  // const isUserSubscribed = useAppSelector((state) => state.auth.user?.isActiveSubscription)

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />
  }

  // if (!isUserSubscribed && !allowedRoutesWithoutSubscription.includes(pathname)) {
  //   return <Navigate to={PLANS}/>
  // }

  return <>{children}</>
}

export default ProtectedRoute
