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
        fecha 
    } = permuta;

    const { user } = useContext(UserContext);
    const documentoUsuarioLogueado = user ? user.documento : null;

    // Asignar los datos del usuario logueado y del otro usuario según corresponda
    const nombreLogueado = id_usuario === documentoUsuarioLogueado ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailLogueado = id_usuario === documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
    const telefonoLogueado = id_usuario === documentoUsuarioLogueado ? telefono_usuario1 : telefono_usuario2;

    const nombreOtro = id_usuario !== documentoUsuarioLogueado ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailOtro = id_usuario !== documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
    const telefonoOtro = id_usuario !== documentoUsuarioLogueado ? telefono_usuario1 : telefono_usuario2;

    // Formatear la fecha
    const formattedFecha = new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <div className="permuta-completada">
            <h3>Permuta completada</h3>
            <p>
                <b>{nombreLogueado}</b> (Email: {emailLogueado}, Teléfono: {telefonoLogueado}) permutó <i>{titulo_articulo}</i> 
                <br></br>con <b>{nombreOtro}</b> (Email: {emailOtro}, Teléfono: {telefonoOtro}) por <i>{titulo_articulo2}</i>
                <br></br>Fecha de la permuta: {formattedFecha}
            </p>
        </div>
    );
}

export default PermutaCompletada;