import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./ArticuloView.css";
import useAuth from "../context/useAuth";
import { getArticuloById, crearPermuta } from "../services/api";
import SeleccionarArticulo from "../components/SeleccionarArticulo";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";

Modal.setAppElement("#root");

function ArticuloView() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [articulo, setArticulo] = useState(null);
  const [seleccionando, setSeleccionando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const res = await getArticuloById(id);
        setArticulo(res.data);
      } catch (err) {
        console.error("Error al cargar el artículo:", err);
        setMensajeError("No se pudo cargar el artículo.");
      }
    };

    fetchArticulo();
  }, [id]);

  const handlePermutar = () => {
    setSeleccionando(true);
  };

  const handleSeleccionar = async (idArticuloOfrecido) => {
    try {
      await crearPermuta({
        id_articulo_solicitado: articulo.id,
        id_articulo_ofrecido: idArticuloOfrecido,
        id_usuario_solicitante: usuario.documento,
        id_usuario_solicitado: articulo.id_usuario,
      });

      setSeleccionando(false);
      navigate("/Permutas");
    } catch (err) {
      console.error("Error al crear solicitud de permuta:", err);
      setMensajeError("Hubo un problema al enviar la solicitud.");
    }
  };

  const obtenerReputacion = (valor) => {
    return "⭐".repeat(valor) + "🔘".repeat(5 - valor);
  };

  if (!usuario) return <div>Cargando usuario...</div>;
  if (!articulo) return <div>Cargando artículo...</div>;

  const esPropietario = articulo.id_usuario === usuario.documento;

  return (
    <>
      <section className="header-articuloview">
        <Header />
      </section>

      <div className="ArticuloView">
        <div className="articulo-image-section">
          <div className="articulo-image-section-space">
            <img src={articulo.imagen} alt={articulo.titulo} />
          </div>
        </div>

        <div className="articulo-info-section">
          <div className="articulo-info-section-square">
            <h1>{articulo.titulo}</h1>
            <p>
              <strong>Categoría:</strong> {articulo.categoria}
            </p>
            <p>
              <strong>Tiempo de uso:</strong> {articulo.tiempo_uso}
            </p>
            <p>
              <strong>Descripción:</strong> {articulo.descripcion}
            </p>

            <div className="VendedorInfo">
              <h2>Información del usuario</h2>
              <p>
                <strong>Nombre:</strong> {articulo.nombre_propietario}{" "}
                {articulo.apellido_propietario}
              </p>
              <p>
                <strong>Reputación:</strong>{" "}
                {obtenerReputacion(articulo.reputacion_propietario)}
              </p>
            </div>

            {esPropietario ? (
              <>
                <Link to={`/EditarArticulo/${id}`}>
                  <button className="editar-articulo">Editar Artículo</button>
                </Link>
                <Link to="/Perfil">
                  <button className="volver-button">Volver a mi perfil</button>
                </Link>
              </>
            ) : (
              <>
                <button className="permutar-articulo" onClick={handlePermutar}>
                  Permutar Artículo
                </button>
                <Modal
                  isOpen={seleccionando}
                  onRequestClose={() => setSeleccionando(false)}
                  className="modal"
                  overlayClassName="overlay"
                >
                  <SeleccionarArticulo onSeleccionar={handleSeleccionar} />
                </Modal>
                <button className="volver-button" onClick={() => navigate(-1)}>
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
