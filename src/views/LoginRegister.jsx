import React from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";

export function LoginRegister(props) {
  return (
    <>
      <body>
        <div className="background"></div>
        <div className="wrapper"></div>
        <div className="overlay">
          <Link to={"/"}>
            <img
              className="logo"
              src="../../public/assets/icons/LogoynombreSwapDealBlanco.svg"
              alt="Logo SwapDeal"
            />
          </Link>
          <div className="container">
            <div className="main">
              <input type="checkbox" id="chk" aria-hidden="true" />

              <div className="login">
                <form className="form">
                  <label htmlFor="chk" aria-hidden="true">
                    Iniciar sesión
                  </label>
                  <input
                    className="input"
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                  <input
                    className="input"
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
                <form className="form">
                  <label htmlFor="chk" aria-hidden="true">
                    Creá tu cuenta
                  </label>
                  <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    name="txt"
                    placeholder="Username"
                    required=""
                  />
                  <input
                    className="input"
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                  <input
                    className="input"
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
