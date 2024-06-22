import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useAppSelector } from './api/store'

import { routes } from './routes/constant'

const App = () => {
  const theme = useAppSelector((state) => state.auth.theme)

  useEffect(() => {
    const body = document.querySelector('body')
    if (theme && body && !body?.classList.contains(theme)) {
      body?.classList.add(theme)
    }
  }, [])

  return (
    <div className="app-container">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
