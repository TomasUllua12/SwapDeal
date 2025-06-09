import { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export function Header() {
  useEffect(() => {
    const toggleBtn = document.querySelector(".toggle_btn");
    const toggleBtnIcon = document.querySelector(".toggle_btn i");
    const dropDownMenu = document.querySelector(".dropdown_menu");

    const handleClick = () => {
      dropDownMenu.classList.toggle("open");
      const isOpen = dropDownMenu.classList.contains("open");

      toggleBtnIcon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    };

    toggleBtn.addEventListener("click", handleClick);

    return () => {
      toggleBtn.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="header-usual">
      <div className="header-navbar">
        <div className="header-logo">
          <Link to="/">
            <img
              className="header-logo"
              src="/assets/icons/LogoynombreSwapDealBlanco.svg"
              alt="Logo SwapDeal"
            />
          </Link>
        </div>
        <ul className="header-links">
          <li>
            <Link to="/Inicio">Inicio</Link>
          </li>
          <li>
            <Link to="/Categorias">Categorías</Link>
          </li>
          <li>
            <Link to="/Permutas">Permutas</Link>
          </li>
          <li>
            <Link to="/Ayuda">Ayuda</Link>
          </li>
        </ul>
        <Link to="/Perfil" className="action_btn">
          Mi perfil
        </Link>
        <div className="toggle_btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className="dropdown_menu">
        <li>
          <Link to="/Inicio">Inicio</Link>
        </li>
        <li>
          <Link to="/Categorias">Categorías</Link>
        </li>
        <li>
          <Link to="/Permutas">Permutas</Link>
        </li>
        <li>
          <Link to="/Ayuda">Ayuda</Link>
        </li>
        <Link to="/Perfil" className="action_btn">
          Mi perfil
        </Link>
      </div>
    </header>
  );
}
