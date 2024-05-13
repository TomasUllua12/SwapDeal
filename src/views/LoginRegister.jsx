import React from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";

export function LoginRegister(props) {
  return (
    <>
      <body>
        <div className="login-background"></div>
        <div className="login-wrapper"></div>
        <div className="login-overlay">
          <Link to={"/"}>
            <img
              className="login-overlay-logo"
              src="../../public/assets/icons/LogoynombreSwapDealBlanco.svg"
              alt="Logo SwapDeal"
            />
          </Link>
          <div className="login-container">
            <div className="login-main">
              <input type="checkbox" id="chk" aria-hidden="true" />

              <div className="login">
                <form className="login-form">
                  <label className="login-label" htmlFor="chk" aria-hidden="true">
                    Iniciar sesión
                  </label>
                  <input
                    className="login-input"
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                  <input
                    className="login-input"
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                  />
                  <Link to={"/Inicio"}>
                    <button>Iniciar sesión</button>
                  </Link>
                </form>
              </div>

              <div className="register">
                <form className="login-form">
                  <label className="login-label" htmlFor="chk" aria-hidden="true">
                    Creá tu cuenta
                  </label>
                  <input
                    className="login-input"
                    type="text"
                    autoComplete="off"
                    name="txt"
                    placeholder="Username"
                    required=""
                  />
                  <input
                    className="login-input"
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                  <input
                    className="login-input"
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                  />
                  <Link to={"/Inicio"}>
                    <button>Crear</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
