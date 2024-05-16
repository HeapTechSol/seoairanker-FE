import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "react-toastify/dist/ReactToastify.css";

import { routes } from "./routes/constant";

import { store, persister } from "./api/store";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ToastContainer rtl={false} />
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
