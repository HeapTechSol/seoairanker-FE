import { RouterProvider } from 'react-router-dom'

import { useAppSelector } from './api/store'

import { routes } from './routes/constant'

const App = () => {
  
  const theme = useAppSelector((state) => state.auth.theme)

  return (
    <div className={`app-container ${theme || "light"}`}>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
