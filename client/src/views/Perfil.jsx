import React, { useState, useEffect, useContext } from "react";
import "./Perfil.css";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import { Link } from "react-router-dom";
import { Articulo } from "../components/Articulo";
import axios from "axios";
import UserContext from "../context/UserContext.jsx"; // Importa el contexto de usuario

export function Perfil(props) {
  const { user } = useContext(UserContext); // Obtiene la información del usuario del contexto

  // Manejar el caso en el que los datos aún no se han cargado
  if (!user) {
    return <div>Loading...</div>;
  }

  const obtenerReputacion = (reputacion) => {
    const estrellas = '⭐'.repeat(reputacion);
    const circulos = '🔘'.repeat(5 - reputacion);
    return estrellas + circulos;
  };

  return (
    <>
      <div className="main-perfil">
        <div className="main-perfil-foto"></div>
        <section className="main-perfil-banner">
          <div className="main-perfil-banner__image">
            <Header />
          </div>
        </section>
        <div className="main-perfil-container">
          <section className="main-perfil-data">
            <div className="main-perfil-data-container">
              <h3> {user.nombre}</h3>
              <div>
                <h4>Reputación 📓</h4>
                <p className="emojis">{obtenerReputacion(data.reputacion)}</p>
                <h4>Sobre mí 😄</h4>
                <p>{user.descripcion}</p>
                <h4>Fecha de unión a SwapDeal 🗓️</h4>
                <p>{user.nombre} se unió el {user.fecha_union}</p>
              </div>
            </div>
          </section>
          <section className="main-perfil-articulos">
            <div className="main-perfil-articulos-buttons">
              <button className="perfil-button-editar-perfil">
                Editar Perfil
              </button>
                <Link to={"/Perfil/CargarArticulo"}>
                <button className="perfil-button-cargar-articulo">
                  Cargar Artículo
                </button>
              </Link>
            </div>
            <div className="main-perfil-articulos-container">
              <div className="cartera-de-inventario">
                <h3>Cartera de Inventario</h3>
                <span className="icono-signo-mas"></span>
              </div>
              <div className="scrollable-content">
                <Articulo />
                <Articulo />
                <Articulo />
                <Articulo />
                <Articulo />
                <Articulo />
                <Articulo />
              </div>
            </div>
          </section>
        </div>
      </div>

      <FooterWave />
    </>
  );
}




