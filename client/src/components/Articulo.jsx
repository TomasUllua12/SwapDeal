// src/components/Articulo.jsx
import React from "react";
import "./Articulo.css";
import { Link, useNavigate } from "react-router-dom";

export function Articulo({ title, categoria, descrip, image, uso }) {
  const navigate = useNavigate();

  const handleViewArticle = () => {
    navigate(`/Articulo/${title}`);
  };

  return (
    <>
      <div className="articulo-container">
        <section className="articulo-categoria-container">
          <h4>{categoria}</h4>
        </section>
        <section className="articulo-image-container">
          <img src={image} alt={title} />
        </section>
        <section className="articulo-button-container">
          <button onClick={handleViewArticle} className="articulo-button-container-link">
            Ver Artículo
          </button>
        </section>
      </div>
    </>
  );
}
