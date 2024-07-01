import React, { useContext } from 'react';
import './PermutaCompleta.css';
import UserContext from '../../context/UserContext';

function PermutaCompletada({ permuta }) {
    const {
        titulo_articulo,
        titulo_articulo2,
        nombre_usuario1, apellido_usuario1, email_usuario1, telefono_usuario1,
        nombre_usuario2, apellido_usuario2, email_usuario2, telefono_usuario2,
        id_usuario, id_usuario2,
        fecha,
        valoracion_usuario1,
        valoracion_usuario2
    } = permuta;

    const { user } = useContext(UserContext);
    const documentoUsuarioLogueado = user ? user.documento : null;

    // Función para convertir la puntuación numérica en estrellas y círculos
    const obtenerPeputacion = (peputacion) => {
        const estrellas = "⭐".repeat(peputacion);
        const circulos = "🔘".repeat(5 - peputacion);
        return estrellas + circulos;
    };

    let nombreLogueado, emailLogueado, telefonoLogueado, nombreOtro, emailOtro, telefonoOtro, valoracionLogueado, valoracionOtro;

    if (id_usuario === documentoUsuarioLogueado) {
        // Datos del usuario logueado
        nombreLogueado = `${nombre_usuario1} ${apellido_usuario1}`;
        emailLogueado = email_usuario1;
        telefonoLogueado = telefono_usuario1;
        valoracionLogueado = obtenerPeputacion(valoracion_usuario1);

        // Datos del otro usuario
        nombreOtro = `${nombre_usuario2} ${apellido_usuario2}`;
        emailOtro = email_usuario2;
        telefonoOtro = telefono_usuario2;
        valoracionOtro = obtenerPeputacion(valoracion_usuario2);
    } else {
        // Datos del otro usuario
        nombreLogueado = `${nombre_usuario2} ${apellido_usuario2}`;
        emailLogueado = email_usuario2;
        telefonoLogueado = telefono_usuario2;
        valoracionLogueado = obtenerPeputacion(valoracion_usuario2);

        // Datos del usuario logueado
        nombreOtro = `${nombre_usuario1} ${apellido_usuario1}`;
        emailOtro = email_usuario1;
        telefonoOtro = telefono_usuario1;
        valoracionOtro = obtenerPeputacion(valoracion_usuario1);
    }

    // Formatear la fecha
    const formattedFecha = new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="permuta-completada">
            <h3>Permuta completada</h3>
            <p>
                <b>{nombreLogueado}</b> (Email: {emailLogueado}, Teléfono: {telefonoLogueado}) permutó <i>{titulo_articulo}</i>
                <br/>con <b>{nombreOtro}</b> (Email: {emailOtro}, Teléfono: {telefonoOtro}) por <i>{titulo_articulo2}</i>
                <br/>Fecha de la permuta: {formattedFecha}
                <br/>Valoración de {nombreLogueado.split(' ')[0]}: {valoracionLogueado}
                <br/>Valoración de {nombreOtro.split(' ')[0]}: {valoracionOtro}
            </p>
        </div>
    );
}

export default PermutaCompletada;