import React from "react";
import FooterWave from "../components/Footers/FooterWave";
import Card from "../components/Card";
import ShowHide from "../components/ShowHide";
import vehicles from "../data/vehicles";
import { Header } from "../components/Header";
import "./Inicio.css"

export function Inicio(props) {
  const vehicleList = vehicles.map((v) => {
    return <Card title={v.name} description={v.description} />;
  });

  return (
    <>
      <Header />
      <main className="inicio-main">
        <div className="inicio-main-container">
          <div className="container">{vehicleList}</div>
          <ShowHide />
          <div className="espacio"></div>
        </div>
      </main>
      <FooterWave />
    </>
  );
}
