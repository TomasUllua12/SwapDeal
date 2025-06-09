import "./PermutaCompleta.css";
import PropTypes from "prop-types";

// Función para formatear fecha
const formatDate = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function PermutaCompletada({ permuta }) {
  const {
    titulo_articulo,
    titulo_articulo2,
    nombre_usuario1,
    apellido_usuario1,
    email_usuario1,
    telefono_usuario1,
    nombre_usuario2,
    apellido_usuario2,
    email_usuario2,
    telefono_usuario2,
    fecha,
    valoracion,
    valoracion2,
  } = permuta;

  return (
    <div className="permuta-completa">
      <h3>Permuta realizada el {formatDate(fecha)}</h3>

      <div className="permuta-articulos">
        <div className="permuta-articulo">
          <h4>{titulo_articulo}</h4>
          <p>
            <strong>Usuario:</strong> {nombre_usuario1} {apellido_usuario1}
            <br />
            <strong>Email:</strong> {email_usuario1}
            <br />
            <strong>Teléfono:</strong> {telefono_usuario1}
            <br />
            <strong>Valoración:</strong> {valoracion ?? "Sin valorar"}
          </p>
        </div>

        <div className="permuta-articulo">
          <h4>{titulo_articulo2}</h4>
          <p>
            <strong>Usuario:</strong> {nombre_usuario2} {apellido_usuario2}
            <br />
            <strong>Email:</strong> {email_usuario2}
            <br />
            <strong>Teléfono:</strong> {telefono_usuario2}
            <br />
            <strong>Valoración:</strong> {valoracion2 ?? "Sin valorar"}
          </p>
        </div>
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
