import React, { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export function Header(props) {
  useEffect(() => {
    const toggleBtn = document.querySelector(".toggle_btn");
    const toggleBtnIcon = document.querySelector(".toggle_btn i");
    const dropDownMenu = document.querySelector(".dropdown_menu");

    const handleClick = () => {
      dropDownMenu.classList.toggle("open");
      const isOpen = dropDownMenu.classList.contains("open");

      toggleBtnIcon.classList = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    };

    toggleBtn.addEventListener("click", handleClick);

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      toggleBtn.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <header className="header-usual">
        <div className="header-navbar">
          <div className="header-logo">
            <Link to={"/"}>
              <img
                className="header-logo"
                src="../../public/assets/icons/LogoynombreSwapDealBlanco.svg"
                alt="Logo SwapDeal"
              />
            </Link>
          </div>
          <ul className="header-links">
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Categorías</a>
            </li>
            <li>
              <a href="">Permutas</a>
            </li>
            <li>
              <a href="">Ayuda</a>
            </li>
          </ul>
          <a href="" className="action_btn">
            Mi perfil
          </a>
          <div className="toggle_btn">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="dropdown_menu">
          <li>
            <a href="">Inicio</a>
          </li>
          <li>
            <a href="">Categorías</a>
          </li>
          <li>
            <a href="">Permutas</a>
          </li>
          <li>
            <a href="">Ayuda</a>
          </li>
          <a href="" className="action_btn">
            Mi perfil
          </a>
        </div>
      </header>
    </>
  );
}
