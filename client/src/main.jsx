import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginRegister } from "./views/LoginRegister.jsx";
import { Inicio } from "./views/Inicio.jsx";
import { Perfil } from "./views/Perfil.jsx";
import { Categorias } from "./views/Categorias.jsx";
import { Ayuda } from "./views/Ayuda.jsx";
import Permutas from "./views/Permutas.jsx";
import CargarArticulo from "./views/CargarArticulo.jsx";
import { EditarPerfil } from "./views/EditarPerfil.jsx";
import ArticuloView from "./views/ArticuloView.jsx";
import EditarArticulo from "./views/EditarArticulo.jsx";
import CategoriaView from "./views/CategoriaView.jsx";

// 🔐 Contexto y protección de rutas
import { AuthProvider } from "./context/authContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

const routes = [
  { path: "/", element: <App /> },
  { path: "/Login", element: <LoginRegister /> },
  { path: "/Inicio", element: <Inicio /> },
  {
    path: "/Perfil",
    element: (
      <PrivateRoute>
        <Perfil />
      </PrivateRoute>
    ),
  },
  {
    path: "/Perfil/EditarPerfil",
    element: (
      <PrivateRoute>
        <EditarPerfil />
      </PrivateRoute>
    ),
  },
  {
    path: "/Perfil/CargarArticulo",
    element: (
      <PrivateRoute>
        <CargarArticulo />
      </PrivateRoute>
    ),
  },
  {
    path: "/Permutas",
    element: (
      <PrivateRoute>
        <Permutas />
      </PrivateRoute>
    ),
  },
  { path: "/Categorias", element: <Categorias /> },
  { path: "/Ayuda", element: <Ayuda /> },
  { path: "/ArticuloView/:id", element: <ArticuloView /> },
  { path: "/EditarArticulo/:id", element: <EditarArticulo /> },
  { path: "/categoria/:categoria", element: <CategoriaView /> },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
