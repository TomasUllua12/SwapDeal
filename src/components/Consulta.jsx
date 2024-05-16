import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Consulta.css";

function MostrarConsulta(){
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }

    return (
        <div className="mostrar-consulta">
            <button className="ver-consulta" onClick={handleClick}>Enviar consulta</button>
            {show && 
            <div className="caja-consulta">
                
                <label for="email" ><p className="email-">Email:</p></label>
                <input className="consul" type="email" id="email" name="email" placeholder="Ingrese su email..."></input>


                <label  for="asunto"><p className="email-">Asunto:</p></label>
                <input className="consul" type="text" id="asunto" name="asunto" placeholder="Ingrese el ausnto del email..."></input>

                <label  for="consulta"><p className="email-">Consulta:</p></label>
                <input className="consul" type="text" id="consulta" name="consulta" placeholder="Ingrese su consulta..."></input>


                <button className="boton-enviar" type="submit"> Enviar</button>


            </div>
            }
        </div>
    );

}


export default MostrarConsulta;