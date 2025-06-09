import { useEffect, useState } from "react";
import "./Solicitud.css";
import Articulo from "../Articulo";
import {
  getUsuario,
  getArticuloById,
  aceptarPermuta,
  rechazarPermuta,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Solicitud({ solicitud, onAceptar, onRechazar, userId }) {
  const {
    id,
    id_articulo_solicitado,
    id_articulo_ofrecido,
    id_usuario_solicitante,
    id_usuario_solicitado,
    estado,
  } = solicitud;

  const [usuarioSolicitante, setUsuarioSolicitante] = useState({});
  const [usuarioSolicitado, setUsuarioSolicitado] = useState({});
  const [articuloSolicitado, setArticuloSolicitado] = useState({});
  const [articuloOfrecido, setArticuloOfrecido] = useState({});
  const [solicitudVisible, setSolicitudVisible] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState(false);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const esSolicitante = userId === id_usuario_solicitante;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user1, user2, art1, art2] = await Promise.all([
          getUsuario(id_usuario_solicitante),
          getUsuario(id_usuario_solicitado),
          getArticuloById(id_articulo_solicitado),
          getArticuloById(id_articulo_ofrecido),
        ]);

        setUsuarioSolicitante(user1.data);
        setUsuarioSolicitado(user2.data);
        setArticuloSolicitado(art1.data);
        setArticuloOfrecido(art2.data);
      } catch (error) {
        console.error("Error al obtener datos de la solicitud:", error);
      }
    };

    fetchData();
  }, [
    id_usuario_solicitante,
    id_usuario_solicitado,
    id_articulo_solicitado,
    id_articulo_ofrecido,
  ]);

  const handleAceptar = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await aceptarPermuta(id);
      onAceptar(id);
      setSolicitudVisible(false);
      setMensaje("Permuta realizada con éxito");
      setMensajeError(false);
    } catch (error) {
      console.error("Error al aceptar permuta:", error);
      setMensaje("Hubo un problema al aceptar la solicitud de permuta");
      setMensajeError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRechazar = async () => {
    try {
      await rechazarPermuta(id);
      onRechazar(id);
      setSolicitudVisible(false);
      setMensaje("Permuta rechazada");
      setMensajeError(true);
    } catch (error) {
      console.error("Error al rechazar permuta:", error);
      setMensaje("Hubo un problema al rechazar la solicitud de permuta");
      setMensajeError(true);
    }
  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  if (!solicitudVisible) return null;

  return (
    <div>
      <div
        className={`expandable-container ${
          esSolicitante ? "solicitud-enviada" : "solicitud-recibida"
        }`}
      >
        <div className="header">
          <h2>
            🆕 <b>¡NUEVA!</b> Solicitud de Permuta 🔁
          </h2>
        </div>
        <div className="content expanded">
          <p>
            <b>{esSolicitante ? "Solicitud enviada" : "Solicitud recibida"}</b>{" "}
            {esSolicitante
              ? "por ti"
              : `por parte de: ${usuarioSolicitante.nombre} ${usuarioSolicitante.apellido}`}
          </p>

          <div className="solicitud-permuta-completa">
            <div className="solicitud-mi-producto">
              <div className="solicitud-mi-producto__container">
                <p>
                  {esSolicitante
                    ? "Ofreciste el siguiente producto:"
                    : "Hubo interés por tu siguiente producto:"}
                </p>
                <Articulo
                  articulo={
                    esSolicitante ? articuloOfrecido : articuloSolicitado
                  }
                />
              </div>
            </div>

            <div className="solicitud-su-producto">
              <div className="solicitud-su-producto__container">
                <p>
                  {esSolicitante
                    ? "Solicitaste el siguiente producto:"
                    : "El usuario ofrece el siguiente producto:"}
                </p>
                <Articulo
                  articulo={
                    esSolicitante ? articuloSolicitado : articuloOfrecido
                  }
                />
              </div>
            </div>

            {!esSolicitante && estado === "pendiente" && (
              <div className="solicitud-buttons">
                <button className="confirmar-button" onClick={handleAceptar}>
                  Aceptar
                </button>
                <button className="rechazar-button" onClick={handleRechazar}>
                  Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mensaje && (
        <div
          className={`mensaje ${
            mensajeError ? "mensaje-error" : "mensaje-exito"
          }`}
        >
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
}

Solicitud.propTypes = {
  solicitud: PropTypes.shape({
    id: PropTypes.number.isRequired,
    id_articulo_solicitado: PropTypes.number.isRequired,
    id_articulo_ofrecido: PropTypes.number.isRequired,
    id_usuario_solicitante: PropTypes.number.isRequired,
    id_usuario_solicitado: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  onAceptar: PropTypes.func.isRequired,
  onRechazar: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default Solicitud;
