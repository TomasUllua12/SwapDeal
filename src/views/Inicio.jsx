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
        <div className="fondo-video">
          
        </div>

        <div className="grid-informacion">
          <div className="secciones-grid">
            <div className="mundo-cambiante">mundo girando</div>
            <div className="cantidad-permutas">permutas en la ultima hora 10</div>
            <div className="comentarios-positivos">esta aplicacion me dejo obtener mis cosas preferidas</div>
            <div className="seguirdad-swapdeal">swap deal cuenta con verificacion constante</div>
            <div className="categorias-mas-intercambiada">la categoria mas permutada es hogar</div>
            <div className="informacion-sobre-app">swap deal mira las mejores practicas dentro de la aplicacion</div>
          </div>
        </div>

        <div className="seccion-articulos-recomendados">

        </div>
      </main>
      
      <FooterWave />
    </>
  );
}
