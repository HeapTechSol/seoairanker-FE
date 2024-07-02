import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import 'react-toastify/dist/ReactToastify.css'

import { store, persister } from './api/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ToastContainer rtl={false} />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_KEY}>
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
