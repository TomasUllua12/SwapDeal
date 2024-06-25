import React, { useState, useContext } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";

export function LoginRegister(props) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/Inicio");
      } else {
        setErrorMessage("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setErrorMessage("Error durante el inicio de sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/register", {
        nombre,
        apellido,
        email: registerEmail,
        password: registerPassword,
        documento,
        telefono,
      });
      if (response.status === 201) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate("/Inicio");
      } else {
        setErrorMessage("Error durante el registro");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage("Error durante el registro");
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="login-input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </form>
            </div>

            <div className="register">
              <form className="login-form" onSubmit={handleRegister}>
                <label className="login-label" htmlFor="chk" aria-hidden="true">
                  Creá tu cuenta
                </label>
                <input
                  className="login-input"
                  type="text"
                  autoComplete="off"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  className="login-input"
                  type="text"
                  autoComplete="off"
                  name="apellido"
                  placeholder="Apellido"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <input
                  className="login-input"
                  type="email"
                  autoComplete="off"
                  name="registerEmail"
                  placeholder="Email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                  className="login-input"
                  type="password"
                  name="registerPassword"
                  placeholder="Password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input
                  className="login-input"
                  type="text"
                  autoComplete="off"
                  name="documento"
                  placeholder="Documento"
                  required
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
                <input
                  className="login-input"
                  type="text"
                  autoComplete="off"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <button type="submit">Crear</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
