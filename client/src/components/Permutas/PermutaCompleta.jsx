import React, { useContext } from 'react';
import './PermutaCompleta.css';
import UserContext from '../../context/UserContext';

function PermutaCompletada({ permuta }) {
    const {
        titulo_articulo,
        titulo_articulo2,
        nombre_usuario1, apellido_usuario1, email_usuario1, telefono_usuario1,
        nombre_usuario2, apellido_usuario2, email_usuario2, telefono_usuario2,
        id_usuario, id_usuario2
    } = permuta;

    const { user } = useContext(UserContext);
    const documentoUsuarioLogueado = user ? user.documento : null;

    const usuarioLogueadoPrimero = id_usuario === documentoUsuarioLogueado ? 1 : 2;

    const nombreLogueado = usuarioLogueadoPrimero === 1 ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailLogueado = usuarioLogueadoPrimero === 1 ? email_usuario1 : email_usuario2;
    const telefonoLogueado = usuarioLogueadoPrimero === 1 ? telefono_usuario1 : telefono_usuario2;

    const nombreOtro = usuarioLogueadoPrimero === 2 ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailOtro = usuarioLogueadoPrimero === 2 ? email_usuario1 : email_usuario2;
    const telefonoOtro = usuarioLogueadoPrimero === 2 ? telefono_usuario1 : telefono_usuario2;

    return (
        <div className="permuta-completada">
            <h3>Permuta completada</h3>
            <p>
                <b>{nombreLogueado}</b> (Email: {emailLogueado}, Teléfono: {telefonoLogueado}) permutó <i>{titulo_articulo}</i> 
                <br></br>con <b>{nombreOtro}</b> (Email: {emailOtro}, Teléfono: {telefonoOtro}) por <i>{titulo_articulo2}</i>
            </p>
        </div>
    );
}

export default PermutaCompletada;