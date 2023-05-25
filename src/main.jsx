import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import DashboardLayout from "./components/DashboardLayout";
import store from "./store/store";
import { Provider } from "react-redux";
let Token = localStorage.getItem("token");

export const routes1 = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const routes2 = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "goals",
            element: <Goals />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={Token == null ? routes1 : routes2} />
    </React.StrictMode>
  </Provider>
);
