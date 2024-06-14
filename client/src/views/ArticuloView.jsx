import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ArticuloView.css";
import UserContext from "../context/UserContext.jsx"; // Importa el UserContext

function ArticuloView() {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Usa el contexto de usuario
  const [articulo, setArticulo] = useState(null);

  const obtenerReputacion = (reputacion) => {
    const estrellas = "⭐".repeat(reputacion);
    const circulos = "🔘".repeat(5 - reputacion);
    return estrellas + circulos;
  };

  useEffect(() => {
    if (user && user.documento) {
      fetch(`http://localhost:3002/usuario/${user.documento}/articulo/${id}`)
        .then(response => response.json())
        .then(data => setArticulo(data))
        .catch(error => console.error('Error fetching the article:', error));
    } else {
      console.error('User not defined or documento missing');
    }
  }, [id, user]);

  if (!articulo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ArticuloView">
      <h1>{articulo.titulo}</h1>
      <h2>{articulo.descripcion}</h2>
      <p>{articulo.categoria}</p>
      <img src={articulo.imagen} alt={`${articulo.titulo} image`} />
      <p>{articulo.tiempo_uso}</p>
      <p>Usuario propietario: {user.nombre} {user.apellido}</p>
      <p className="reputacion">Reputación usuario: {obtenerReputacion(user.reputacion)}</p>
    </div>
  );
}

export default ArticuloView;