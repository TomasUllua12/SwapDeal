import React from "react";
import "./PaginaPrincipal.css";
import FooterWavePrincipal from "../../components/Footers/FooterWavePrincipal";
import BotonLogin from "../../components/BotonLogin";

export function PaginaPrincipal(props) {
  return (
    <>
      <header className="header-principal">
        <img
          className="header-principal__image"
          src="../../../public/assets/icons/LogoynombreSwapDeal.svg"
          alt=""
        />
        <div className="header-principal--title-container">
          <h1 className="header-principal__title">
            Tu Plataforma Segura de Intercambio
          </h1>
          <p className="header-principal__description">
            SwapDeal te guía a través del laberinto de intercambios seguros y
            rentables.
          </p>
        </div>
        <div className="background-header-color"></div>
        <video
          autoPlay
          playsInline
          muted
          loop
          className="background-header-video"
        >
          <source
            src="../../../public/assets/vids/saludosVideo.mp4"
            type="video/mp4"
          />
          Tu navegador no admite la etiqueta de video HTML5.
        </video>
        <BotonLogin />
      </header>

      <main className="main-principal">
        <section className="main-principal-section-1">
          <div className="main-principal-section-1--title">
            <h2 className="main-principal-section-1--title-text">
              Sección de información 1
            </h2>
            <p className="main-principal-section-1--title-description">
              Subtitulo de sección de información 1
            </p>
          </div>
        </section>

        <section className="main-principal-section-2">
          <span className="main-principal-section-2--swapdeal-logo"></span>
          <div className="main-principal-section-2--title">
            <h2 className="main-principal-section-2--title-text">
              Sección de información 2
            </h2>
            <p className="main-principal-section-2--title-description">
              Subtitulo de sección de información 2
            </p>
          </div>

          <section className="main-principal-section-2--cards">
            <article className="--card">
              <span className="--card__icon clock"></span>
              <p className="--card-title">Info 1</p>
              <p className="--card-body">Párrafo de información</p>
            </article>
            <article className="--card">
              <span className="--card__icon eye"></span>
              <p className="--card-title">Info 2</p>
              <p className="--card-body">Párrafo de información</p>
            </article>
            <article className="--card">
              <span className="--card__icon money"></span>
              <p className="--card-title">Info 3</p>
              <p className="--card-body">Párrafo de información</p>
            </article>
            <article className="--card">
              <span className="--card__icon tick"></span>
              <p className="--card-title">Info 4</p>
              <p className="--card-body">Párrafo de información</p>
            </article>
          </section>
        </section>

        <section className="swapdeal-image-container">
          <div className="swapdeal-image-container__color"></div>
          <h2 className="swapdeal-image-container--text">Comienza Ahora.</h2>
        </section>

        <section className="main-principal-section-3">
          <div className="main-principal-section-3--title">
            <h2 className="main-principal-section-3--title-text">
              Sección de información 3
            </h2>
            <p className="main-principal-section-3--description">
              Subtitulo de sección de información 3
            </p>
          </div>
        </section>
      </main>
      <FooterWavePrincipal />
    </>
  );
}

export default PaginaPrincipal;
