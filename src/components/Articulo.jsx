import React from "react";
import "./Articulo.css";
import { Link } from "react-router-dom";

export function Articulo(props) {
  return (
    <>
      <div className="articulo-container">
        <section className="articulo-categoria-container"><h4>Tecnología</h4></section>
        <section className="articulo-image-container"></section>
        <section className="articulo-button-container">
          <Link className="articulo-button-container-link">
            Ver Artículo
          </Link>
        </section>
      </div>
    </>
  );
}
