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
        console.log('Datos del artículo:', data); // Verificar los datos recibidos
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
      <div className="VendedorInfo">
        <h2>Información del Vendedor</h2>
        <p>Nombre: {articulo.nombre_propietario} {articulo.apellido_propietario}</p>
        <p>Correo: {articulo.correo_propietario}</p>
        <p>Reputación: {obtenerReputacion(articulo.reputacion_propietario)}</p>
      </div>
      {isOwner ? (
        <>
        <Link to={`/EditarArticulo/${id}`}>
          <button className="editar-articulo">Editar Artículo</button>
        </Link>
        <Link to="/Perfil">
            <a href="" className="action_btn">
              volver a mi perfil
            </a>
          </Link>
        </>
      ) : (
        <>
        <Link to={`/SolicitudPermuta/${articulo.id}`}>
          <button className="permutar-articulo">Permutar Artículo</button>
        </Link>
        <button className="volver-button" onClick={() => window.history.back()}>Volver</button>
        </>
      )}
    </div>
  );
}

export default ArticuloView;