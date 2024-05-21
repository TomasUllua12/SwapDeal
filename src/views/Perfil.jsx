import React from "react";
import "./Perfil.css";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import { Articulo } from "../components/Articulo";

export function Perfil(props) {
  return (
    <>
      <Header />

      <div className="main-perfil">
        <div className="main-perfil-foto"></div>
        <section className="main-perfil-banner">
          <div className="main-perfil-banner__image"></div>
        </section>
        <div className="main-perfil-container">
          <section className="main-perfil-data">
            <div className="main-perfil-data-container">
              <h3>Nombre del Usuario</h3>
              <div>
                <h4>Reputación</h4>
                <p>153 permutaciones concretadas en los últimos 3 meses</p>
              </div>
            </div>
          </section>
          <section className="main-perfil-articulos">
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
                <Articulo />
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
