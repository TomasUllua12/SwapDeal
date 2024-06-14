import React, { useState, useEffect, useContext } from "react";
import FooterWave from "../components/Footers/FooterWave";
import Card from "../components/Card";
import ShowHide from "../components/ShowHide";
import { Header } from "../components/Header";
import "./Inicio.css";
import Articulo from "../components/Articulo";
import vehicles from "../data/vehicles"; // Si necesitas vehicles, mantenlo aquí
import cards from "../data/card"; // Si necesitas cards, mantenlo aquí
import axios from "axios"; // Asegúrate de importar axios si lo necesitas para realizar peticiones HTTP
import UserContext from "../context/UserContext.jsx"; // Importa el contexto de usuario

export function Inicio(props) {

  const [articulos, setArticulos] = useState([]);
  const { user } = useContext(UserContext); // Obtiene la información del usuario del contexto

  useEffect(() => {
    const fetchArticulos = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/usuario/${user.documento}/articulos`);
            setArticulos(response.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    if (user) {
        fetchArticulos();
    }
}, [user]);



  const vehicleList = vehicles.map((v) => {
    return <Card title={v.name} description={v.description} />;
  });

  return (
    <>
      <main className="inicio-main">
        <div className="fondo-video">
          <div className="header-inicio">
            <Header />
          </div>
          <div className="header-color"></div>
          <video
            autoPlay
            playsInline
            muted
            loop
            className="background-video-inicio"
          >
            <source
              src="../../../public/assets/vids/video-inicio.mp4"
              type="video/mp4"
            />
            Tu navegador no admite la etiqueta de video HTML5.
          </video>
        </div>

        <div className="informacion-secciones">
          <div className="mundo-cambiante">
            <video autoPlay playsInline muted loop className="video-mundo">
              <source
                src="../../../public/assets/vids/Cyber_World_Network.mp4"
                type="video/mp4"
              />
              Tu navegador no admite la etiqueta de video HTML5.
            </video>
            <div className="texto-mundo">
              <span className="texto-swap">
                SWAPDEAL<br></br>
              </span>
              ENCONTRANOS EN TODO EL MUNDO<br></br> <br></br>
              Una experiencia para todos, porque todos merecen lo mejor
            </div>
          </div>

          <div className="cantidad-permutas">
            <div>
              <div className="permutas-en">PERMUTAS EN</div>
              <div className="numeros-permutas">
                <div className="mes">El mes: 23.456</div>
                <br></br>
                <div className="mes">La semana: 4880</div>
                <br></br>
                <div className="mes">El dia: 1368</div>
                <br></br>
                <div className="mes">La hora: 45</div>
              </div>
            </div>
          </div>

          <div className="comentarios-positivos">
            <div className="comen">COMENTARIOS DE LOS USUARIOS </div>
            <div className="caja-comentarios">
              <div className="comentario1">
                {" "}
                Matina peggi: <br></br>gracias a swapdeal logre tener lo que
                siempre quise ⭐⭐⭐⭐⭐
              </div>
              <div className="comentario2">
                {" "}
                Carlos nievas: <br></br>swapdeal me permitio darle otra vida mis
                cosas y tambien conseguir nuevas ⭐⭐⭐⭐
              </div>
            </div>
          </div>

          <div className="seguirdad-swapdeal">
            <div>
              <div className="verificacion">
                SWAPDEAL CUENTA CON VERIFICACION CONSTANTE
              </div>
              <div className="protocolo">
                {" "}
                -Contamos con los mejores protocolos de seguridad de datos{" "}
                <br></br>
                <br></br>
                -Tenemos IA como asistentes virtuales <br></br>
                <br></br>
                -Nuestros servidos funcionan 24/7 para mantener la seguridad
              </div>
            </div>
          </div>

          <div className="categorias-mas-intercambiada">
            <div>
              <div className="categoria-mas">LA CATEGORIA MAS PERMUTADA ES</div>
              <div className="contenedor-categoria">
                <card name="Hogar" color="#994000" />
              </div>
            </div>
          </div>

          <div className="informacion-sobre-app">
            <div>
              <a className="mejores-practicas" href="">
                SWAPDEAL MIRA LAS MEJORES PRACTICAS DENTRO DE LA APLICACION
              </a>
            </div>
          </div>
        </div>

        <div className="seccion-articulos-recomendados">
          <div className="main-perfil-articulos-container">
            <div className="articulos-recomendados">
              ARTICULOS RECOMENDADOS<br></br>
              <br></br>
            </div>
              <div className="scrollable-content">
                  {articulos.map((articulo) => (
                    <Articulo key={articulo.id} articulo={articulo} />
                  ))}
              </div>
          </div>
        </div>
      </main>

      <FooterWave />
    </>
  );
}
