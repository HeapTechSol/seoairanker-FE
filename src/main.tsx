import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { loadStripe } from '@stripe/stripe-js'
import { ToastContainer } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import 'react-toastify/dist/ReactToastify.css'

import { store, persister } from './api/store'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ToastContainer rtl={false} />
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </PersistGate>
  </Provider>
)
