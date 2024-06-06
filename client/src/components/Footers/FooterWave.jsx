import React from "react";
import "./FooterWave.css";
import { Link } from "react-router-dom";

export function FooterWave(props) {
  return (
    <>
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <img
          className="footer-logo"
          src="../../public/assets/img/Logo SwapDeal Blanco.svg"
        ></img>
        <ul className="menu">
          <li className="menu__item">
            <Link to="/Inicio">
              <a className="menu__link" href="#">
                Inicio
              </a>
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/Categorias">
              <a className="menu__link" href="#">
                Categorías
              </a>
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/Permutas">
              <a className="menu__link" href="#">
                Permutas
              </a>
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/Ayuda">
              <a className="menu__link" href="#">
                Ayuda
              </a>
            </Link>
          </li>
        </ul>
        <p>
          &copy;2024 <b>SwapDeal</b> | Todos los Derechos Reservados.
        </p>
      </footer>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
}

export default FooterWave;
