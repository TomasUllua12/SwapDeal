import React, { useState } from "react";
import "./Solicitud.css";
import { Articulo } from "../Articulo";

export function Solicitud({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="expandable-container">
        <div className="header" onClick={toggleExpand}>
          <h2>🆕 <b>¡NUEVA!</b> Solicitud de Permuta 🔁</h2>
        </div>
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <p>
            <b>Nueva solicitud</b> de permuta por parte de: <b>Simon Feeney</b>
          </p>
          <div className="solicitud-permuta-completa">
            <div className="solicitud-mi-producto">
              <div className="solicitud-mi-producto__container">
                <p>Hubo interés por tu siguiente producto:</p>
                <Articulo />
              </div>
            </div>
            <div className="solicitud-buttons">
              <button className="confirmar">Confirmar ⇆</button>
              <button className="rechazar">Rechazar ✕</button>
            </div>
            <div className="solicitud-su-producto">
              <div className="solicitud-su-producto__container">
                <p>Simón ofrece el siguiente producto:</p>
                <Articulo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
