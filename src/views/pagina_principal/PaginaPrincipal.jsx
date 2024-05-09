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
        <BotonLogin />
      </header>

      <main>
        <section className="main-principal-section-1">
          <div className="main-principal-section-1--title">
            <h2 className="main-principal-section-1--title-text">
              Escoge el plan que mejor se ajuste a ti.
            </h2>
            <p className="main-principal-section-1--title-description">
              Cualquier plan te da acceso completo a nuestra plataforma.
            </p>
          </div>
        </section>

        <section className="main-principal-section-2">
          <span className="main-principal-section-2--swapdeal-logo"></span>
          <div className="main-principal-section-2--title">
            <h2 className="main-principal-section-2--title-text">
              Creamos un producto sin comparación.
            </h2>
            <p className="main-principal-section-2--title-description">
              Confiable y diseñado para su uso diario.
            </p>
          </div>

          <section className="main-principal-section-2--cards">
            <article className="--card">
              <span className="--card__icon clock"></span>
              <p className="--card-title">Tiempo real</p>
              <p className="--card-body">
                Nuestro API toma información minuto a minuto sobre las tasas que
                más determinan el comportamiento.
              </p>
            </article>
            <article className="--card">
              <span className="--card__icon eye"></span>
              <p className="--card-title">No hay tasas escondidas</p>
              <p className="--card-body">
                Ni en la compra o al momento de exit, Batabit siempre te muestra
                el costo real de lo que estás adquiriendo.
              </p>
            </article>
            <article className="--card">
              <span className="--card__icon money"></span>
              <p className="--card-title">Compara monedas</p>
              <p className="--card-body">
                No más rumores, con Babtabit sabrás el valor real de cada moneda
                en el mercado actual.
              </p>
            </article>
            <article className="--card">
              <span className="--card__icon tick"></span>
              <p className="--card-title">Información confiable</p>
              <p className="--card-body">
                Nuestras fuentes están 100% verificadas y continuamos auditando
                su contenido mientras se actualizan.
              </p>
            </article>
          </section>
        </section>

        <section className="swapdeal-image-container">
          <h2 className="swapdeal-image-container--text">Conócelo Ahora.</h2>
        </section>

        <section className="main-principal-section-3">
          <div className="main-principal-section-3--title">
            <h2 className="main-principal-section-3--title-text">
              Visibilizamos todas las tasas de cambio.
            </h2>
            <p className="main-principal-section-3--description">
              Traemos información en tiempo real de las casas de cambio y las
              monedas más importantes del mundo.
            </p>
          </div>
        </section>
      </main>
      <FooterWavePrincipal />
    </>
  );
}

export default PaginaPrincipal;
