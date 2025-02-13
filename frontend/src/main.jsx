import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./components/RootLayout.jsx";
import UserList from "./components/UserList.jsx";
import RemovedUsers from "./components/RemovedUsers.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import AboutUs from "./components/AboutUs.jsx";
import ContactUs from "./components/Contactus.jsx";
import PrivacyPolicy from "./components/Privacypolicy.jsx";
import UserForm from "./components/UserForm.jsx";
const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "userlist",
        element: <UserList />,
      },
      {
        path: "removed-users",
        element: <RemovedUsers />,
      },
      {
        path: "/users/:username",
        element: <Profile />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },{
        path:"adduser",
        element: <UserForm/>
      }
    ],
  },
]);



createRoot(document.getElementById("root")).render(
  <RouterProvider router={browserRouterObj} />
);
