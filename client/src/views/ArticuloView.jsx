import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import "./ArticuloView.css";
import UserContext from "../context/UserContext";
import SeleccionarArticulo from "../components/SeleccionarArticulo";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";

Modal.setAppElement('#root'); // Necesario para accesibilidad

function ArticuloView() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [articulo, setArticulo] = useState(null);
  const [seleccionando, setSeleccionando] = useState(false);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const navigate = useNavigate();

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
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticulo(data);
      } catch (error) {
        console.error("Error fetching the article:", error);
      }
    };

    fetchArticulo();
  }, [id]);

  const handlePermutar = () => {
    setSeleccionando(true);
  };

  const handleSeleccionar = async (idArticuloOfrecido) => {
    setArticuloSeleccionado(idArticuloOfrecido);
    try {
      const response = await fetch("http://localhost:3002/solicitudPermuta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_articulo_solicitado: articulo.id,
          id_articulo_ofrecido: idArticuloOfrecido,
          id_usuario_solicitante: user.documento,
          id_usuario_solicitado: articulo.id_usuario,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setSeleccionando(false);
      navigate("/Permutas"); // Navegar a la página de Permutas después de enviar la solicitud
    } catch (error) {
      console.error("Error creating swap request:", error);
    }
  };

  if (!articulo) {
    return <div>Loading...</div>;
  }

  const isOwner = articulo.id_usuario === user.documento;

  return (
    <>
      <section className="header-articuloview">
        <div>
          <Header />
        </div>
      </section>
      <div className="ArticuloView">
        <div className="articulo-image-section">
          <div className="articulo-image-section-space">
            <img src={articulo.imagen} alt={`${articulo.titulo} image`} />
          </div>
        </div>
        <div className="articulo-info-section">
          <div className="articulo-info-section-square">
            <h1>{articulo.titulo}</h1>
            <p>Categoria: <b>{articulo.categoria}</b></p>

            <p>Tiempo de Uso: <b>{articulo.tiempo_uso}</b></p>
            <p>Descripcion: <b>{articulo.descripcion}</b></p>
            <div className="VendedorInfo">
              <h2>Información del usuario</h2>
              <p>
                Nombre: <b>{articulo.nombre_propietario}{" "}
                {articulo.apellido_propietario}</b>
              </p>
              <p>
                Reputación: {obtenerReputacion(articulo.reputacion_propietario)}
              </p>
            </div>
            {isOwner ? (
              <>
                <Link to={`/EditarArticulo/${id}`}>
                  <button className="editar-articulo">Editar Artículo</button>
                </Link>
                <Link to="/Perfil">
                  <a href="" className="action_btn_nuevo">
                    Volver a mi perfil
                  </a>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="permutar-articulo"
                  onClick={handlePermutar}
                >
                  Permutar Artículo
                </button>
                <Modal
                  isOpen={seleccionando}
                  onRequestClose={() => setSeleccionando(false)}
                  contentLabel="Seleccionar Artículo"
                  className="modal"
                  overlayClassName="overlay"
                >
                  <SeleccionarArticulo onSeleccionar={handleSeleccionar} />
                </Modal>
                <button
                  className="volver-button"
                  onClick={() => window.history.back()}
                >
                  Volver
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <FooterWave />
    </>
  );
}

export default ArticuloView;