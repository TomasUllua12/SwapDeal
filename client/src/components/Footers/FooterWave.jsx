import "./FooterWave.css";
import { Link } from "react-router-dom";

export function FooterWave() {
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
          alt="Logo SwapDeal"
        />
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" to="/Inicio">
              Inicio
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/Categorias">
              Categorías
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/Permutas">
              Permutas
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/Ayuda">
              Ayuda
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
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
}

export default FooterWave;
