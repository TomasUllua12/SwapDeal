import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Preguntas.css";

export function MostrarPreguntas({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="pregunta-expandable-container">
        <div className="header" onClick={toggleExpand}>
          <h2>
            ¿Pregunta frecuente número #?
          </h2>
        </div>
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <p>
            <b>Nueva solicitud</b> de permuta por parte de: <b>Simon Feeney</b>
          </p>
        </div>
      </div>
    </>
  );
}

export default MostrarPreguntas;
