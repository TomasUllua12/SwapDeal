import React from "react";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import "./Ayuda.css";
import preguntas from "../data/preguntas";
import { MostrarPreguntas } from "../components/Preguntas"; // Asegúrate de importar el componente correcto

export function Ayuda(props) {
  const pregun = preguntas.map((v, index) => {
    return (
      <MostrarPreguntas key={index} pregun={v.pregun} respuesta={v.respuesta} />
    );
  });

  return (
    <>
      <div className="secciones-ayuda">
        <section className="main-ayuda-banner">
          <div className="main-ayuda-banner__image">
            <Header />
          </div>
        </section>
        <h2 className="ayuda-title">Ayuda</h2>
        <div className="preguntas-frecuentes">
          <h2 className="preguntass">Preguntas frecuentes</h2>
          {pregun}
        </div>
        <div className="acciones-recomendadas">
          <h2 className="acciones">Acciones recomendadas</h2>
          <p className="lis-acciones">
            1- Hacer doble verificacion<br></br>
            2- Ver el perfil de los otros usuarios<br></br>
            3- Hacer las permutas en lugares seguros<br></br>
            4- Siempre ser cordial
          </p>
        </div>
        <div className="enviar-consulta">
          <h2 className="consul">Envianos tu consulta</h2>
          <h3 className="email">E-mail:</h3>
          <input placeholder="Ejemplo@gmail.com" className="inpu-mail"></input>
          <h3 className="asunto">Asunto</h3>
          <input
            placeholder="Escriba el asunto..."
            className="inpu-asunto"
          ></input>
          <h3 className="ti-consul">Consulta</h3>
          <input
            placeholder="Escriba su consulta..."
            className="inpu-consul"
          ></input>
          <button type="submit" className="enviar">
            Enviar consulta
          </button>
        </div>
      </div>
      <FooterWave />
    </>
  );
}
