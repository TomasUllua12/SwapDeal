import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Consultas.css";

function MostrarPreguntas(){
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }

    return (
        <div className="mostrar-pregunta">
            <button onClick={handleClick}>Hide
            Text</button>
            {show && <h2>HIDE ME!</h2>}
        </div>
    );

}


export default MostrarPreguntas;
