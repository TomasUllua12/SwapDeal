import { useState, useEffect } from "react";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import "./Inicio.css";
import Articulo from "../components/Articulo";
import axios from "axios";
import useAuth from "../context/useAuth";

export function Inicio() {
  const [articulos, setArticulos] = useState([]);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/articulos/excluyendo/${usuario.documento}`
        );
        setArticulos(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (usuario) {
      fetchArticulos();
    }
  }, [usuario]);

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
                SWAPDEAL
                <br />
              </span>
              ENCONTRANOS EN TODO EL MUNDO
              <br />
              <br />
              Una experiencia para todos, porque todos merecen lo mejor
            </div>
          </div>

          <div className="cantidad-permutas">
            <div>
              <div className="permutas-en">PERMUTAS EN</div>
              <div className="numeros-permutas">
                <div className="mes">El mes: 23.456</div>
                <br />
                <div className="mes">La semana: 4880</div>
                <br />
                <div className="mes">El dia: 1368</div>
                <br />
                <div className="mes">La hora: 45</div>
              </div>
            </div>
          </div>

          <div className="comentarios-positivos">
            <div className="comen">COMENTARIOS DE LOS USUARIOS </div>
            <div className="caja-comentarios">
              <div className="comentario1">
                Matina Peggi:
                <br />
                gracias a swapdeal logré tener lo que siempre quise ⭐⭐⭐⭐⭐
              </div>
              <div className="comentario2">
                Carlos Nievas:
                <br />
                swapdeal me permitió darle otra vida a mis cosas y también
                conseguir nuevas ⭐⭐⭐⭐
              </div>
            </div>
          </div>

          <div className="seguirdad-swapdeal">
            <div>
              <div className="verificacion">
                SWAPDEAL CUENTA CON VERIFICACIÓN CONSTANTE
              </div>
              <div className="protocolo">
                - Contamos con los mejores protocolos de seguridad de datos
                <br />
                <br />
                - Tenemos IA como asistentes virtuales
                <br />
                <br />- Nuestros servidores funcionan 24/7 para mantener la
                seguridad
              </div>
            </div>
          </div>

          <div className="categorias-mas-intercambiada">
            <div>
              <div className="categoria-mas">LA CATEGORÍA MÁS PERMUTADA ES</div>
              <div className="contenedor-categoria">
                <img
                  src="../../public/assets/img/Captura de pantalla 2024-07-06 193432.png"
                  alt="Categoría Más Permutada"
                  className="imagen-categoria"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="seccion-articulos-recomendados">
          <div className="main-perfil-articulos-contai">
            <div className="articulos-recomendados">
              ARTÍCULOS RECOMENDADOS
              <br />
              <br />
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
