import React from "react";
import "./Categorias.css";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import { CardCategoria } from "../components/CardCategoria";
import cards from "../data/card";

export function Categorias(props) {
  
  const cardList = cards.map((v) => {
    return <CardCategoria title={v.name} color={v.color}/>;
  });

  return (
    <>
      <Header />
      <div className="main-categorias">
        <h2 className="main-categorias-title">Categorías</h2>
        <div className="main-categorias-cards">
          {cardList}
        </div>
      </div>
      <FooterWave />
    </>
  );
}
