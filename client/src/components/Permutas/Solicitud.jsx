import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Solicitud.css";
import Articulo from "../Articulo"; // Importa el componente de Articulo

export function Solicitud({ solicitud, onAceptar, onRechazar, userId }) {
  const { id, id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado, estado, fecha } = solicitud;
  const [usuarioSolicitante, setUsuarioSolicitante] = useState({});
  const [usuarioSolicitado, setUsuarioSolicitado] = useState({});
  const [articuloSolicitado, setArticuloSolicitado] = useState({});
  const [articuloOfrecido, setArticuloOfrecido] = useState({});
  const isSolicitante = userId === id_usuario_solicitante;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSolicitanteResponse = await fetch(`http://localhost:3002/usuario/${id_usuario_solicitante}`);
        const userSolicitadoResponse = await fetch(`http://localhost:3002/usuario/${id_usuario_solicitado}`);
        const articuloSolicitadoResponse = await fetch(`http://localhost:3002/articulo/${id_articulo_solicitado}`);
        const articuloOfrecidoResponse = await fetch(`http://localhost:3002/articulo/${id_articulo_ofrecido}`);

        if (!userSolicitanteResponse.ok || !userSolicitadoResponse.ok || !articuloSolicitadoResponse.ok || !articuloOfrecidoResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const userSolicitanteData = await userSolicitanteResponse.json();
        const userSolicitadoData = await userSolicitadoResponse.json();
        const articuloSolicitadoData = await articuloSolicitadoResponse.json();
        const articuloOfrecidoData = await articuloOfrecidoResponse.json();

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
              <button className="confirmar-button" onClick={() => onAceptar(id)}>Aceptar</button>
              <button className="rechazar-button" onClick={() => onRechazar(id)}>Rechazar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}