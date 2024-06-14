// src/views/ArticuloView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import articulos from "../data/articulos.js";
import "./ArticuloView.css"; // Importa el archivo CSS para la vista del artículo

export function ArticuloView() {
  const { title } = useParams();
  const articulo = articulos.find((articulo) => articulo.title === title);

  if (!articulo) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div className="articulo-view-container">
      <div className="articulo-view-header">
        <h1>{articulo.title}</h1>
      </div>
      <div className="articulo-view-content">
        <img src={articulo.image} alt={articulo.title} className="articulo-view-image" />
        <div className="articulo-view-details">
          <p className="articulo-view-description">{articulo.descrip}</p>
          <p className="articulo-view-uso"><strong>Uso:</strong> {articulo.uso}</p>
        </div>
      </div>
    </div>
  );
}
