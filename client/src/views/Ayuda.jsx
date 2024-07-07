
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import "./Ayuda.css";
import preguntas from "../data/preguntas";
import { MostrarPreguntas } from "../components/Preguntas"; // Asegúrate de importar el componente correcto
import React, { useState } from "react";

export function Ayuda(props) {

  const [mensajeExito, setMensajeExito] = useState("");

  const handleEnviarConsulta = () => {
    setMensajeExito("Consulta enviada exitosamente");
    setTimeout(() => {
      setMensajeExito("");
    }, 2000); // El mensaje desaparecerá después de 2 segundos
  };

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
              respuesta="Selecciona el artículo que te interesa, ofrece algo a cambio y espera la confirmación del otro usuario."
            />
            <MostrarPreguntas
              pregunta="¿Cómo puedo cargar un artículo?"
              respuesta="Haz clic en 'Cargar artículo', llena los detalles y sube una foto. ¡Listo para permutar!"
            />
            <MostrarPreguntas
              pregunta="¿Cómo acepto una solicitud de permuta?"
              respuesta="Revisa la solicitud en tu bandeja de solicitudes, si te agrada el intercambio, haz clic en 'Aceptar'."
            />
            <MostrarPreguntas
              pregunta="¿Cómo puedo valorar una permuta?"
              respuesta="Después de completar una permuta, ve a la sección de historial y deja tu valoración."
            />
          </div>
        </section>

        <div className="enviar-consulta">
        <h2 className="consul">Envíanos tu consulta</h2>
        <div className="contenedor-enviar-consulta">
          <h3 className="email">Tu E-mail:</h3>
          <input placeholder="Ejemplo@gmail.com" className="inpu-mail"></input>
          <h3 className="asunto">Asunto</h3>
          <input placeholder="Escriba el asunto..." className="inpu-asunto"></input>
          <h3 className="ti-consul">Consulta</h3>
          <input placeholder="Escriba su consulta..." className="inpu-consul"></input>
        </div>
        <button type="submit" className="enviar" onClick={handleEnviarConsulta}>
          Enviar consulta
        </button>
        {mensajeExito && (
          <div className="mensaje-exito">
            <p>{mensajeExito}</p>
          </div>
        )}
      </div>
      </div>
      <FooterWave />
    </>
  );
}
