import { useState } from "react";
import PropTypes from "prop-types";
import "./PermutaCompleta.css";
import useAuth from "../../context/useAuth";
import { actualizarValoracion } from "../../services/api";

const obtenerValoracion = (valor) => {
  if (!valor) return "Sin valorar";
  return "\u2b50".repeat(valor) + "\u26aa".repeat(5 - valor);
};

function PermutaCompletada({ permuta }) {
  const { usuario } = useAuth();
  const {
    id_historial,
    titulo_articulo,
    titulo_articulo2,
    id_usuario1,
    nombre_usuario1,
    apellido_usuario1,
    email_usuario1,
    telefono_usuario1,
    id_usuario2,
    nombre_usuario2,
    apellido_usuario2,
    email_usuario2,
    telefono_usuario2,
    fecha,
    valoracion,
    valoracion2,
  } = permuta;

  const documentoUsuarioLogueado = usuario?.documento;
  const [valoracionLogueado, setValoracionLogueado] = useState(
    id_usuario1 === documentoUsuarioLogueado ? valoracion : valoracion2
  );
  const [valoracionNueva, setValoracionNueva] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarValoracion = async () => {
    try {
      await actualizarValoracion({
        id_historial,
        id_usuario: documentoUsuarioLogueado,
        id_usuario1,
        id_usuario2,
        nuevaValoracion: valoracionNueva,
      });
      setValoracionLogueado(Number(valoracionNueva));
      setEnviado(true);
    } catch (error) {
      console.error("Error al actualizar la valoración:", error);
    }
  };

  const nombreLogueado =
    id_usuario1 === documentoUsuarioLogueado
      ? `${nombre_usuario1} ${apellido_usuario1}`
      : `${nombre_usuario2} ${apellido_usuario2}`;
  const emailLogueado =
    id_usuario1 === documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
  const telefonoLogueado =
    id_usuario1 === documentoUsuarioLogueado
      ? telefono_usuario1
      : telefono_usuario2;
  const tituloArticuloLogueado =
    id_usuario1 === documentoUsuarioLogueado
      ? titulo_articulo2
      : titulo_articulo;

  const nombreOtro =
    id_usuario1 !== documentoUsuarioLogueado
      ? `${nombre_usuario1} ${apellido_usuario1}`
      : `${nombre_usuario2} ${apellido_usuario2}`;
  const emailOtro =
    id_usuario1 !== documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
  const telefonoOtro =
    id_usuario1 !== documentoUsuarioLogueado
      ? telefono_usuario1
      : telefono_usuario2;
  const valoracionOtro =
    id_usuario1 !== documentoUsuarioLogueado ? valoracion : valoracion2;
  const tituloArticuloOtro =
    id_usuario1 !== documentoUsuarioLogueado
      ? titulo_articulo2
      : titulo_articulo;

  const formattedFecha = new Date(fecha).toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="permutaHistorial">
      <div className="permuta-completada">
        <h3>Permuta completada</h3>
        <div className="usuariosPermutadores">
          <div className="user1" id="userHistory">
            <p>
              <b>{nombreLogueado}</b>
            </p>
            <p>Email: <b>{emailLogueado}</b></p>
            <p>Teléfono: <b>{telefonoLogueado}</b></p>
            <p>
              permutó <b><i>{tituloArticuloLogueado}</i></b>
            </p>
            <p>Valoración propia : {obtenerValoracion(valoracionLogueado)}</p>
          </div>
          <p className="logo-intercambio">⇆</p>
          <div className="user2" id="userHistory">
            <p>
              <b>{nombreOtro}</b>
            </p>
            <p>Email: <b>{emailOtro}</b></p>
            <p>Teléfono: <b>{telefonoOtro}</b></p>
            <p>
              permutó <b><i>{tituloArticuloOtro}</i></b>
            </p>
            <p>
              Valoración de {nombreOtro.split(" ")[0]}: {obtenerValoracion(valoracionOtro)}
            </p>
          </div>
        </div>

        {!valoracionLogueado && !enviado && (
          <div className="valoracion-form">
            <select
              className="opciones-valoracion"
              value={valoracionNueva}
              onChange={(e) => setValoracionNueva(e.target.value)}
            >
              <option value="">Selecciona una valoración</option>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {"\u2b50".repeat(val)}
                </option>
              ))}
            </select>
            <button className="boton-valoracion" onClick={enviarValoracion}>
              Enviar Valoración
            </button>
          </div>
        )}
        <p className="fecha-permuta">Fecha de la permuta: {formattedFecha}</p>
      </div>
    </div>
  );
}

PermutaCompletada.propTypes = {
  permuta: PropTypes.shape({
    titulo_articulo: PropTypes.string.isRequired,
    titulo_articulo2: PropTypes.string.isRequired,
    nombre_usuario1: PropTypes.string.isRequired,
    apellido_usuario1: PropTypes.string.isRequired,
    email_usuario1: PropTypes.string.isRequired,
    telefono_usuario1: PropTypes.string.isRequired,
    nombre_usuario2: PropTypes.string.isRequired,
    apellido_usuario2: PropTypes.string.isRequired,
    email_usuario2: PropTypes.string.isRequired,
    telefono_usuario2: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    valoracion: PropTypes.number,
    valoracion2: PropTypes.number,
  }).isRequired,
};

export default PermutaCompletada;
