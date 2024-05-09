import React from "react";
import "./FooterWavePrincipal.css";

export function FooterWavePrincipal(props) {
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
            <a className="menu__link" href="#">
              1
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              2
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              3
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              4
            </a>
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

export default FooterWavePrincipal;
