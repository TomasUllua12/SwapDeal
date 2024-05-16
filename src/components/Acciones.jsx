import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Acciones.css";

function MostrarAcciones(){
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }

    return (
        <div className="acciones-recomendadas">
            <button className="acciones-recomendadas" onClick={handleClick}>Acciones recomendadas</button>
            {show && <p className="lis-preguntas">
                        1- Como funciona la app?<br></br>
                        
                    </p>}
        </div>
    );

}


export default MostrarPreguntas;
