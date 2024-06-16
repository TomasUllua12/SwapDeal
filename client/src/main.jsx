import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import vehicles from "./data/vehicles.js";
import VehicleView from "./views/VehicleView.jsx";
import articulos from "./data/articulos.js";
import { LoginRegister } from "./views/LoginRegister.jsx";
import { Inicio } from "./views/Inicio.jsx";
import { Perfil } from "./views/Perfil.jsx";
import { Categorias } from "./views/Categorias.jsx";
import { Ayuda } from "./views/Ayuda.jsx";
import { Permutas } from "./views/Permutas.jsx";
import { CargarArticulo } from "./views/CargarArticulo.jsx";
import { EditarPerfil } from "./views/EditarPerfil.jsx";
import { UserProvider } from './context/UserContext.jsx'; // Importa el UserProvider
import  ArticuloView  from "./views/ArticuloView.jsx";
import  EditarArticulo  from "./views/EditarArticulo.jsx";
import CategoriaView from "./views/CategoriaView.jsx"; 



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
  {
    path: "/Categorias",
    element: <Categorias/>,
  },
  {
    path: "/Ayuda",
    element: <Ayuda />,
  },
  {
    path: "/Permutas",
    element: <Permutas />,
  },
  {
    path: "/Perfil/CargarArticulo",
    element: <CargarArticulo />,
  },
  {
    path: "/Perfil/EditarPerfil",
    element: <EditarPerfil />,
  },
  {
    path: "/ArticuloView/:id",
    element: <ArticuloView />,
  },
  {
    path: "/EditarArticulo/:id",
    element: <EditarArticulo />,
  },
  {
    path: "/categoria/:categoria",
    element: <CategoriaView />,
  }
];
/*
articulos.forEach((articulo) => {
  routes.push({
    path: articulo.title,
    element: <ArticuloView articulo={articulo} />,
  });
});
*/
vehicles.forEach((vehicle) => {
  routes.push({
    path: vehicle.name,
    element: <VehicleView vehicle={vehicle} />,
  });
});

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
