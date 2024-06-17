import React, { useEffect, useState } from "react";
import Articulo from "../Articulo";
import "./Solicitud.css";

function Solicitud({ solicitud, onAceptar, onRechazar, userId }) {
const { id, id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado, estado } = solicitud;
const [usuarioSolicitante, setUsuarioSolicitante] = useState({});
const [usuarioSolicitado, setUsuarioSolicitado] = useState({});
const [articuloSolicitado, setArticuloSolicitado] = useState({});
const [articuloOfrecido, setArticuloOfrecido] = useState({});
const isSolicitante = userId === id_usuario_solicitante;


useEffect(() => {
    const fetchData = async () => {
        try {
            const [userSolicitanteResponse, userSolicitadoResponse, articuloSolicitadoResponse, articuloOfrecidoResponse] = await Promise.all([
                fetch(`http://localhost:3002/usuario/${id_usuario_solicitante}`),
                fetch(`http://localhost:3002/usuario/${id_usuario_solicitado}`),
                fetch(`http://localhost:3002/articulo/${id_articulo_solicitado}`),
                fetch(`http://localhost:3002/articulo/${id_articulo_ofrecido}`)
            ]);

            if (!userSolicitanteResponse.ok || !userSolicitadoResponse.ok || !articuloSolicitadoResponse.ok || !articuloOfrecidoResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const [userSolicitanteData, userSolicitadoData, articuloSolicitadoData, articuloOfrecidoData] = await Promise.all([
                userSolicitanteResponse.json(),
                userSolicitadoResponse.json(),
                articuloSolicitadoResponse.json(),
                articuloOfrecidoResponse.json()
            ]);

            setUsuarioSolicitante(userSolicitanteData);
            setUsuarioSolicitado(userSolicitadoData);
            setArticuloSolicitado(articuloSolicitadoData);
            setArticuloOfrecido(articuloOfrecidoData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [id_usuario_solicitante, id_usuario_solicitado, id_articulo_solicitado, id_articulo_ofrecido]);

const handleAceptar = async () => {
    try {
        const response = await fetch(`http://localhost:3002/solicitudPermuta/${id}/aceptar`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Error al aceptar la solicitud de permuta');
        }
        onAceptar(id);
        alert('Permuta realizada con éxito');
    } catch (error) {
        console.error('Error al aceptar la solicitud de permuta:', error);
        alert('Hubo un problema al aceptar la solicitud de permuta');
    }
};

const handleRechazar = async () => {
    try {
        const response = await fetch(`http://localhost:3002/solicitudPermuta/${id}/rechazar`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Error al rechazar la solicitud de permuta');
        }
        onRechazar(id);
        alert('Permuta rechazada');
    } catch (error) {
        console.error('Error al rechazar la solicitud de permuta:', error);
        alert('Hubo un problema al rechazar la solicitud de permuta');
    }
};

return (
    <div className="solicitud">
        <div className="info-solicitante">
            <h3>Usuario Solicitante:</h3>
            <p>{usuarioSolicitante.nombre}</p>
        </div>
        <div className="info-solicitado">
            <h3>Usuario Solicitado:</h3>
            <p>{usuarioSolicitado.nombre}</p>
        </div>
        <div className="info-articulo-solicitado">
            <h3>Artículo Solicitado:</h3>
            <Articulo articulo={articuloSolicitado} />
        </div>
        <div className="info-articulo-ofrecido">
            <h3>Artículo Ofrecido:</h3>
            <Articulo articulo={articuloOfrecido} />
        </div>
        <div className="acciones">
            {estado === 'pendiente' && isSolicitante && (
                <>
                    <button onClick={handleAceptar}>Aceptar</button>
                    <button onClick={handleRechazar}>Rechazar</button>
                </>
            )}
            {estado === 'aceptada' && (
                <p>La solicitud de permuta ha sido aceptada.</p>
            )}
            {estado === 'rechazada' && (
                <p>La solicitud de permuta ha sido rechazada.</p>
            )}
        </div>
    </div>
);
}

export default Solicitud;