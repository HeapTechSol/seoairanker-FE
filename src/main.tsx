import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import { routes } from "./routes/constant";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />,
);
