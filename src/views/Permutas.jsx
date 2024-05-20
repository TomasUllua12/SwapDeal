import React from "react";
import "./Permutas.css";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import { Solicitud } from "../components/Permutas/Solicitud";

export function Permutas(props) {
  return (
    <>
      <Header />
      <main className="main-permutas">
        <h2 className="main-permutas-solicitudes-title">
          Solicitudes de Permuta
        </h2>
        <section className="main-permutas-solicitudes">
          <div className="main-permutas-solicitudes__container">
            <Solicitud/>
            <Solicitud/>
            <Solicitud/>
          </div>
        </section>
        <h2 className="main-permutas-permutas-title">Permutas</h2>
        <section className="main-permutas-permutas">
          <div className="main-permutas-permutas__container"></div>
        </section>
        <h2 className="main-permutas-historial-title">Historial de Permutas</h2>
        <section className="main-permutas-historial">
          <div className="main-permutas-historial__container"></div>
        </section>
      </main>
      <FooterWave />
    </>
  );
}
