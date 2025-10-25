import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import RouteError from "./RouteError";

import Dashboard from "../pages/Dashboard..jsx";
import Posts from "../pages/Posts.jsx";
import ContactUs from "../pages/ContactUs.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "posts", element: <Posts /> },
      { path: "contact_us", element: <ContactUs /> },
    ]
  }
]);
