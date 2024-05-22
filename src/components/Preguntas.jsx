import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Preguntas.css";

export function MostrarPreguntas({ pregun = "pregun", respuesta = "respuesta" }) {
    const [show, setShow] = useState(false);

    const handleClick = (event) => {
        setShow(!show);
    };

    return (
        <div className="mostrar-pregunta">
            <button className="ver-preguntas" onClick={handleClick}>{pregun}</button>
            {show && <p className="lis-preguntas">{respuesta}</p>}
        </div>
    );
}

export default MostrarPreguntas;
