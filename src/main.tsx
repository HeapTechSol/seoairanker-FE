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
      <GoogleOAuthProvider clientId="993511257163-7404b81795f9c8rp888v8k44ki4914ft.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
