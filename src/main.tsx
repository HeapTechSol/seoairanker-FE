import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import 'react-toastify/dist/ReactToastify.css'

import { store, persister } from './api/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="981760717524-mtfs1l4psct68lohkuplm7v08ebi7ng1.apps.googleusercontent.com">
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ToastContainer rtl={false} />
      <App />
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
)
