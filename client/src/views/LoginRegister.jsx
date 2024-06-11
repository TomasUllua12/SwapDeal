import React, { useState, useContext } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext.jsx"; // Importa el UserContext

export function LoginRegister(props) {
  const { setUser } = useContext(UserContext); // Usa el contexto del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      if (response.data) {
        setUser(response.data); // Guarda la información del usuario en el contexto
        navigate("/Inicio");
      } else {
        setErrorMessage("Credenciales inválidas"); // Establece el mensaje de error
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setErrorMessage("Error durante el inicio de sesión"); // Establece el mensaje de error
    }
  };

  return (
    <>
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
              <form className="login-form" onSubmit={handleLogin}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="login-input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error si existe */}
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
    </>
  );
}