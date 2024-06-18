import React from 'react';
import './PermutaCompletada.css';

function PermutaCompletada({ permuta }) {
    const { titulo_articulo, titulo_articulo2, nombre_usuario1, apellido_usuario1, nombre_usuario2, apellido_usuario2 } = permuta;

    return (
        <div className="permuta-completada">
            <h3>Permuta completada</h3>
            <p><b>{nombre_usuario1} {apellido_usuario1}</b> permutó <i>{titulo_articulo}</i> con <b>{nombre_usuario2} {apellido_usuario2}</b> por <i>{titulo_articulo2}</i></p>
        </div>
    );
}

export default PermutaCompletada;