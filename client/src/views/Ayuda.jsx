import React from "react";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import "./Ayuda.css";
import preguntas from "../data/preguntas";
import { MostrarPreguntas } from "../components/Preguntas"; // Asegúrate de importar el componente correcto

export function Ayuda(props) {
  return (
    <>
      <div className="secciones-ayuda">
        <section className="main-ayuda-banner">
          <div className="main-ayuda-banner__image">
            <Header />
            <h2 className="ayuda-title">Ayuda</h2>
          </div>
        </section>

        <section className="ayuda-preguntas-frecuentes">
          <h2 className="preguntas--h2">Preguntas frecuentes</h2>
          <div className="preguntas-frecuentes">
            <MostrarPreguntas
              pregunta="¿Cómo realizo una permuta?"
              respuesta="Se debe seleccionar un articulo..."
            />
            <MostrarPreguntas
              pregunta="¿Cómo puedo cargar una artículo?"
              respuesta="Se debe seleccionar un articulo..."
            />
            <MostrarPreguntas
              pregunta="¿Cómo acepto una solicitud de permuta?"
              respuesta="Se debe seleccionar un articulo..."
            />
            <MostrarPreguntas
              pregunta="¿Cómo puedo valorar una permuta?"
              respuesta="Se debe seleccionar un articulo..."
            />
          </div>
        </section>

        <div className="enviar-consulta">
          <h2 className="consul">Envianos tu consulta</h2>
          <div className="contenedor-enviar-consulta">
            <h3 className="email">E-mail:</h3>
            <input
              placeholder="Ejemplo@gmail.com"
              className="inpu-mail"
            ></input>
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
          </div>
          <button type="submit" className="enviar">
            Enviar consulta
          </button>
        </div>
      </div>
      <FooterWave />
    </>
  );
}
