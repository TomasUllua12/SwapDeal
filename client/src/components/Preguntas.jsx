import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Preguntas.css";

export function MostrarPreguntas({ children, pregunta, respuesta}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="pregunta-expandable-container">
        <div className="header" onClick={toggleExpand}>
          <h2>
            {pregunta}
          </h2>
        </div>
        <div className={`contenido ${isExpanded ? "expanded" : "collapsed"}`}>
          <p>
            {respuesta}
          </p>
        </div>
      </div>
    </>
  );
}

export default MostrarPreguntas;
