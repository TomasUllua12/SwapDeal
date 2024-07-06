import React, { useEffect, useState } from "react";
import "./Solicitud.css";
import Articulo from "../Articulo";
import { useNavigate } from "react-router-dom";

function Solicitud({ solicitud, onAceptar, onRechazar, userId }) {
    const { id, id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado, estado } = solicitud;
    const [usuarioSolicitante, setUsuarioSolicitante] = useState({});
    const [usuarioSolicitado, setUsuarioSolicitado] = useState({});
    const [articuloSolicitado, setArticuloSolicitado] = useState({});
    const [articuloOfrecido, setArticuloOfrecido] = useState({});
    const [solicitudVisible, setSolicitudVisible] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [mensajeError, setMensajeError] = useState(false);
    const navigate = useNavigate();
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
            });

            if (!response.ok) {
                throw new Error('Error al aceptar la solicitud de permuta');
            }

            setUsuarioSolicitante(prev => ({ ...prev, id: id_usuario_solicitado }));
            setUsuarioSolicitado(prev => ({ ...prev, id: id_usuario_solicitante }));
            onAceptar(id);
            setSolicitudVisible(false);
            setMensaje("Permuta realizada con éxito");
            setMensajeError(false);
        } catch (error) {
            console.error('Error al aceptar la solicitud de permuta:', error);
            setMensaje("Hubo un problema al aceptar la solicitud de permuta");
            setMensajeError(true);
        }
    };

    const handleRechazar = async () => {
        try {
            const response = await fetch(`http://localhost:3002/solicitudPermuta/${id}/rechazar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al rechazar la solicitud de permuta');
            }

            onRechazar(id);
            setSolicitudVisible(false);
            setMensaje("Permuta rechazada");
            setMensajeError(true);
        } catch (error) {
            console.error('Error al rechazar la solicitud de permuta:', error);
            setMensaje("Hubo un problema al rechazar la solicitud de permuta");
            setMensajeError(true);
        }
    };

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    return (
        <div>
            {solicitudVisible && (
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
            )}
            {mensaje && (
                <div className={`mensaje ${mensajeError ? 'mensaje-error' : 'mensaje-exito'}`}>
                    <p>{mensaje}</p>
                </div>
            )}
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