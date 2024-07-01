import React, { useContext, useState } from 'react';
import './PermutaCompleta.css';
import UserContext from '../../context/UserContext';

function PermutaCompletada({ permuta }) {
    const {
        id_historial,
        titulo_articulo,
        titulo_articulo2,
        id_usuario1,
        nombre_usuario1, apellido_usuario1, email_usuario1, telefono_usuario1,
        id_usuario2,
        nombre_usuario2, apellido_usuario2, email_usuario2, telefono_usuario2,
        fecha,
        valoracion,
        valoracion2
    } = permuta;

    const { user } = useContext(UserContext);
    const documentoUsuarioLogueado = user ? user.documento : null;
    const [valoracionLogueado, setValoracionLogueado] = useState(id_usuario1 === documentoUsuarioLogueado ? valoracion : valoracion2);
    const [valoracionNueva, setValoracionNueva] = useState('');
    const [enviado, setEnviado] = useState(false);

    const obtenerValoracion = (valoracion) => {
        const estrellas = "⭐".repeat(valoracion);
        const circulos = "🔘".repeat(5 - valoracion);
        return estrellas + circulos;
    };

    const enviarValoracion = () => {
        fetch('http://localhost:3002/actualizarValoracion', { // Cambiar la URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_historial,
                id_usuario: documentoUsuarioLogueado,
                id_usuario1,
                id_usuario2,
                nuevaValoracion: valoracionNueva
            })
        })
        .then(response => response.text()) // Cambiar a .text() para manejar respuestas que no son JSON
        .then(data => {
            try {
                const json = JSON.parse(data);
                console.log('Valoración actualizada:', json);
                setValoracionLogueado(valoracionNueva); // Actualizar la valoración localmente
                setEnviado(true);
            } catch (error) {
                console.error('Error al parsear la respuesta:', data);
            }
        })
        .catch(error => {
            console.error('Error al actualizar la valoración:', error);
        });
    };

    const nombreLogueado = id_usuario1 === documentoUsuarioLogueado ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailLogueado = id_usuario1 === documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
    const telefonoLogueado = id_usuario1 === documentoUsuarioLogueado ? telefono_usuario1 : telefono_usuario2;
    const tituloArticuloLogueado = id_usuario1 === documentoUsuarioLogueado ? titulo_articulo2 : titulo_articulo;

    const nombreOtro = id_usuario1 !== documentoUsuarioLogueado ? `${nombre_usuario1} ${apellido_usuario1}` : `${nombre_usuario2} ${apellido_usuario2}`;
    const emailOtro = id_usuario1 !== documentoUsuarioLogueado ? email_usuario1 : email_usuario2;
    const telefonoOtro = id_usuario1 !== documentoUsuarioLogueado ? telefono_usuario1 : telefono_usuario2;
    const valoracionOtro = id_usuario1 !== documentoUsuarioLogueado ? valoracion : valoracion2;
    const tituloArticuloOtro = id_usuario1 !== documentoUsuarioLogueado ? titulo_articulo2 : titulo_articulo;

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
                <b>{nombreLogueado}</b> (Email: {emailLogueado}, Teléfono: {telefonoLogueado}) permutó <i>{tituloArticuloLogueado}</i> 
                <br/>con 
                <br/><b>{nombreOtro}</b> (Email: {emailOtro}, Teléfono: {telefonoOtro}) por <i>{tituloArticuloOtro}</i>
                <br/>Fecha de la permuta: {formattedFecha}
                <br/>Valoración de {nombreLogueado.split(' ')[0]}: {obtenerValoracion(valoracionLogueado)}
                <br/>Valoración de {nombreOtro.split(' ')[0]}: {obtenerValoracion(valoracionOtro)}
                {!valoracionLogueado && !enviado && (
                    <div>
                        <select value={valoracionNueva} onChange={e => setValoracionNueva(e.target.value)}>
                            <option value="">Selecciona una valoración</option>
                            {[1, 2, 3, 4, 5].map(val => (
                                <option key={val} value={val}>{"⭐".repeat(val)}</option>
                            ))}
                        </select>
                        <button onClick={enviarValoracion}>Enviar Valoración</button>
                    </div>
                )}
            </p>
        </div>
    );
}

export default PermutaCompletada;