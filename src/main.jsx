import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import vehicles from "./data/vehicles.js";
import VehicleView from "./views/VehicleView.jsx";
import { LoginRegister } from "./views/LoginRegister.jsx";
import { Inicio } from "./views/Inicio.jsx";
import { Perfil } from "./views/Perfil.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: <LoginRegister />,
  },
  {
    path: "/Inicio",
    element: <Inicio />,
  },
  {
    path: "/Perfil",
    element: <Perfil />,
  },
];

vehicles.forEach((vehicle) => {
  routes.push({
    path: vehicle.name,
    element: <VehicleView vehicle={vehicle} />,
  });
});

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
