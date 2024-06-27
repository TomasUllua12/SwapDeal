import React, { useState, useEffect, useContext } from "react";
import FooterWave from "../components/Footers/FooterWave";
import Card from "../components/Card";
import ShowHide from "../components/ShowHide";
import { Header } from "../components/Header";
import "./Inicio.css";
import Articulo from "../components/Articulo";
import vehicles from "../data/vehicles";
import cards from "../data/card";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";

export function Inicio(props) {
  const [articulos, setArticulos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/articulos/excluyendo/${user.documento}`
        );
        setArticulos(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (user) {
      fetchArticulos();
    }
  }, [user]);

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
          <div className="primer-container-inicio">
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
                <div className="permutas-en">ÚLTIMAS PERMUTAS EN</div>
                <div className="numeros-permutas">
                  <div className="mes">
                    El mes: <br></br> <b>23.456</b>
                  </div>
                  <div className="mes">
                    La semana: <br></br> <b>4880</b>
                  </div>
                  <div className="mes">
                    El dia: <br></br> <b>1368</b>
                  </div>
                  <div className="mes">
                    La hora: <br></br> <b>45</b>
                  </div>
                </div>
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
        </div>

        <div className="seccion-articulos-recomendados">
          <div className="main-inicio-articulos-container">
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
