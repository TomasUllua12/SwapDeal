import { useState, useEffect } from "react";
import "./Perfil.css";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import { Link } from "react-router-dom";
import Articulo from "../components/Articulo";
import useAuth from "../context/useAuth";
import { getArticulosByUser, getUsuario } from "../services/api";

// Función para formatear fecha
function formatDate(fecha) {
  const date = new Date(fecha);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("es-ES", options);
}

export function Perfil() {
  const { usuario } = useAuth();
  const [articulos, setArticulos] = useState([]);
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState("");

  const obtenerReputacion = (reputacion) => {
    const estrellas = "⭐".repeat(reputacion);
    const circulos = "🔘".repeat(5 - reputacion);
    return estrellas + circulos;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!usuario) return;

      try {
        const [resArticulos, resUsuario] = await Promise.all([
          getArticulosByUser(usuario.documento),
          getUsuario(usuario.documento),
        ]);

        setArticulos(resArticulos.data);
        setFotoPerfilUrl(resUsuario.data.imagen);
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      }
    };

    fetchData();
  }, [usuario]);

  if (!usuario) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <>
      <div className="main-perfil">
        {fotoPerfilUrl && (
          <img
            className="main-perfil-foto"
            src={fotoPerfilUrl}
            alt="Foto de perfil"
          />
        )}
        <section className="main-perfil-banner">
          <div className="main-perfil-banner__image">
            <Header />
          </div>
        </section>
        <div className="main-perfil-container">
          <section className="main-perfil-data">
            <div className="main-perfil-data-container">
              <h3>{usuario.nombre}</h3>
              <h3>{usuario.apellido}</h3>
              <div>
                <h4>Reputación 📓</h4>
                <p className="emojis">
                  {obtenerReputacion(usuario.reputacion)}
                </p>
                <h4>Sobre mí 😄</h4>
                <p>{usuario.descripcion}</p>
                <h4>Fecha de unión a SwapDeal 🗓️</h4>
                <p>
                  {usuario.nombre} se unió el {formatDate(usuario.fecha_union)}
                </p>
              </div>
            </div>
          </section>

          <section className="main-perfil-articulos">
            <div className="main-perfil-articulos-buttons">
              <Link to={"/Perfil/EditarPerfil"}>
                <button className="perfil-button-editar-perfil">
                  Editar Perfil
                </button>
              </Link>
              <Link to={"/Perfil/CargarArticulo"}>
                <button className="perfil-button-cargar-articulo">
                  Cargar Artículo
                </button>
              </Link>
            </div>

            <div className="main-perfil-articulos-container">
              <div className="cartera-de-inventario">
                <h3>Inventario</h3>
              </div>
              <div className="scrollable-content">
                {articulos.map((articulo) => (
                  <Articulo key={articulo.id} articulo={articulo} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterWave />
    </>
  );
}
