import React from "react";
import "./Categorias.css";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import { CardCategoria } from "../components/CardCategoria";
import cards from "../data/card";

export function Categorias(props) {
  const cardList = cards.map((v) => {
    return <CardCategoria title={v.name} color={v.color} img={v.img} />;
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
