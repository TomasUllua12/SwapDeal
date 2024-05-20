import React from "react";
import "./ArticuloView.css";

function ArticuloView({articulo}) {
  return (
    <>
      <div className="ArticuloView">
        <h1>{articulo.title}</h1>
        <h2>{articulo.descrip}</h2>
        <img src={articulo.image} alt={articulo.title + " image"} />
      </div>
    </>
  );
}

export default ArticuloView;