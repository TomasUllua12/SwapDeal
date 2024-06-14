import React from "react";
import { Link } from "react-router-dom";
import "./Articulo.css";

function Articulo({ articulo }) {
    return (
        <div className="articulo-container">
            <section className="articulo-categoria-container">
                <h4>{articulo.categoria}</h4>
            </section>
            <section className="articulo-image-container">
                <img  src={articulo.imagen} alt={articulo.titulo} />
            </section>
            <section className="articulo-button-container">
                <Link className="articulo-button-container-link" to={`/Articulo/${articulo.id}`}>
                    Ver Artículo
                </Link>
            </section>
        </div>
    );
}

export default Articulo;
