import React from "react";
import "./Perfil.css";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import { Articulo } from "../components/Articulo";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Perfil(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/usuario/44973086")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Manejar el caso en el que los datos aún no se han cargado
  if (data === null) {
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
              <h3>{data.nombre + " " + data.apellido}</h3>
              <div>
                <h4>Reputación 📓</h4>
                <p className="emojis">{obtenerReputacion(data.reputacion)}</p>
                <h4>Sobre mí 😄</h4>
                <p>
                  {data.descripcion}
                </p>
                <h4>Fecha de unión a SwapDeal 🗓️</h4>
                <p>{data.nombre + " " + data.apellido + " se unió el " + data.fecha_union}</p>
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
