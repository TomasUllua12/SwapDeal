import React from "react";
import "./Categorias.css";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import { CardCategoria } from "../components/CardCategoria";
import cards from "../data/card";

export function Categorias() {
  const cardList = cards.map((v, index) => {
    return (
      <CardCategoria
        key={index}
        title={v.name}
        color={v.color}
        img={v.img}
        link={`/categoria/${encodeURIComponent(v.name)}`} // Codificación correcta de URLs
      />
    );
  });

  return (
    <>
      <section className="main-categoria-banner">
        <div className="main-categoria-banner__image">
          <Header />
          <h2 className="categoria-title">Categorías</h2>
        </div>
      </section>
      <div className="main-categorias">
        <div className="main-categorias-cards">{cardList}</div>
      </div>
      <FooterWave />
    </>
  );
}

export default Categorias;