import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Acciones.css";

function MostrarAcciones(){
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }

    return (
        <div className="mostrar-acciones">
            <button className="ver-acciones" onClick={handleClick}>Acciones recomendadas</button>
            {show && <p className="lis-acciones">
                        -Hacer doble verificaciones<br></br>
                        -Revisar perfil usuarios<br></br>
                        -Subir articulos en buen estado<br></br>
                        -Ver pasos de permutas
                        
                    </p>}
        </div>
    );

}


export default MostrarAcciones;
