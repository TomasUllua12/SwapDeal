import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Preguntas.css";

function MostrarPreguntas(){
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }

    return (
        <div className="mostrar-pregunta">
            <button className="ver-preguntas" onClick={handleClick}>Ver preguntas frecuentes</button>
            {show && <p className="lis-preguntas">
                        1- Como funciona la app?<br></br>
                        -yfdnbgsdcngbdfvsdctn<br></br>
                        2- Como puedo registrarme?<br></br>
                        -grvCEMN SFVSDCASX<br></br>
                        3- Como hago una permutacion?<br></br>
                        -ytbavdmdnfgbsfvdc<br></br>
                        4- Como gano puntos?<br></br>
                        -hbsnbsgfvdfbd
                    </p>}
        </div>
    );

}


export default MostrarPreguntas;
