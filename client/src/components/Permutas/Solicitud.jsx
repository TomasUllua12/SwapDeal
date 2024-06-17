import React, { useEffect, useState } from "react";
import "./Solicitud.css";
import Articulo from "../Articulo";

function Solicitud({ solicitud, onAceptar, onRechazar, userId }) {
    const { id, id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado, estado } = solicitud;
    const [usuarioSolicitante, setUsuarioSolicitante] = useState({});
    const [usuarioSolicitado, setUsuarioSolicitado] = useState({});
    const [articuloSolicitado, setArticuloSolicitado] = useState({});
    const [articuloOfrecido, setArticuloOfrecido] = useState({});
    const [solicitudVisible, setSolicitudVisible] = useState(true); // Estado para manejar la visibilidad de la solicitud
    const isSolicitante = userId === id_usuario_solicitante;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userSolicitanteData, userSolicitadoData, articuloSolicitadoData, articuloOfrecidoData] = await Promise.all([
                    fetchUserData(id_usuario_solicitante),
                    fetchUserData(id_usuario_solicitado),
                    fetchArticuloData(id_articulo_solicitado),
                    fetchArticuloData(id_articulo_ofrecido)
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ id }), // Si es necesario enviar datos adicionales al backend
            });

            if (!response.ok) {
                throw new Error('Error al aceptar la solicitud de permuta');
            }

            // Actualizar estado local después de aceptar la permuta
            setUsuarioSolicitante(prev => ({ ...prev, id: id_usuario_solicitado }));
            setUsuarioSolicitado(prev => ({ ...prev, id: id_usuario_solicitante }));
            // Puedes añadir lógica adicional aquí, como refrescar datos si es necesario
            onAceptar(id);
            setSolicitudVisible(false); // Ocultar la solicitud después de aceptar
            alert('Permuta realizada con éxito');
        } catch (error) {
            console.error('Error al aceptar la solicitud de permuta:', error);
            alert('Hubo un problema al aceptar la solicitud de permuta');
        }
    };

    const handleRechazar = async () => {
        try {
            const response = await fetch(`http://localhost:3002/solicitudPermuta/${id}/rechazar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ id }), // Si es necesario enviar datos adicionales al backend
            });

            if (!response.ok) {
                throw new Error('Error al rechazar la solicitud de permuta');
            }

            onRechazar(id);
            setSolicitudVisible(false); // Ocultar la solicitud después de aceptar
            alert('Permuta rechazada');
        } catch (error) {
            console.error('Error al rechazar la solicitud de permuta:', error);
            alert('Hubo un problema al rechazar la solicitud de permuta');
        }
    };

    if (!solicitudVisible) {
      return null; // No renderizar nada si la solicitud no es visible
  }

    return (
        <div className={`expandable-container ${isSolicitante ? 'solicitud-enviada' : 'solicitud-recibida'}`}>
            <div className="header">
                <h2>🆕 <b>¡NUEVA!</b> Solicitud de Permuta 🔁</h2>
            </div>
            <div className="content expanded">
                <p><b>{isSolicitante ? 'Solicitud enviada' : 'Solicitud recibida'}</b> de permuta {isSolicitante ? 'por ti' : `por parte de: ${usuarioSolicitante.nombre} ${usuarioSolicitante.apellido}`}</p>
                <div className="solicitud-permuta-completa">
                    <div className="solicitud-mi-producto">
                        <div className="solicitud-mi-producto__container">
                            <p>{isSolicitante ? 'Ofreciste el siguiente producto:' : 'Hubo interés por tu siguiente producto:'}</p>
                            <Articulo articulo={isSolicitante ? articuloOfrecido : articuloSolicitado} />
                        </div>
                    </div>
                    <div className="solicitud-su-producto">
                        <div className="solicitud-su-producto__container">
                            <p>{isSolicitante ? 'Solicitaste el siguiente producto:' : 'El usuario ofrece el siguiente producto:'}</p>
                            <Articulo articulo={isSolicitante ? articuloSolicitado : articuloOfrecido} />
                        </div>
                    </div>
                    {!isSolicitante && estado === "pendiente" && (
                        <div className="solicitud-buttons">
                            <button className="confirmar-button" onClick={handleAceptar}>Aceptar</button>
                            <button className="rechazar-button" onClick={handleRechazar}>Rechazar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

async function fetchUserData(userId) {
    const response = await fetch(`http://localhost:3002/usuario/${userId}`);
    if (!response.ok) {
        throw new Error(`Error fetching user data for userId ${userId}`);
    }
    return response.json();
}

async function fetchArticuloData(articuloId) {
    const response = await fetch(`http://localhost:3002/articulo/${articuloId}`);
    if (!response.ok) {
        throw new Error(`Error fetching article data for articleId ${articuloId}`);
    }
    return response.json();
}

export default Solicitud;