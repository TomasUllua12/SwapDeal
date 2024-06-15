import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./ArticuloView.css";
import UserContext from "../context/UserContext.jsx";

function ArticuloView() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [articulo, setArticulo] = useState(null);

  const obtenerReputacion = (reputacion) => {
    const estrellas = "⭐".repeat(reputacion);
    const circulos = "🔘".repeat(5 - reputacion);
    return estrellas + circulos;
  };

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await fetch(`http://localhost:3002/articulo/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticulo(data);
      } catch (error) {
        console.error('Error fetching the article:', error);
      }
    };

    fetchArticulo();
  }, [id]);

  if (!articulo) {
    return <div>Loading...</div>;
  }

  const isOwner = articulo.id_usuario === user.documento;

  return (
    <div className="ArticuloView">
      <h1>{articulo.titulo}</h1>
      <h2>{articulo.descripcion}</h2>
      <p>{articulo.categoria}</p>
      <img src={articulo.imagen} alt={`${articulo.titulo} image`} />
      <p>{articulo.tiempo_uso}</p>
      <p>Usuario propietario: {user.nombre} {user.apellido}</p>
      <p className="reputacion">Reputación usuario: {obtenerReputacion(user.reputacion)}</p>
      {isOwner ? (
        <Link to={`/ArticuloView/${articulo.id}/editar`}>
          <button className="editar-articulo">Editar Artículo</button>
        </Link>
      ) : (
        <Link to={`/SolicitudPermuta/${articulo.id}`}>
          <button className="permutar-articulo">Permutar Artículo</button>
        </Link>
      )}
    </div>
  );
}

export default ArticuloView;