import { useState } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { login, register } from "../services/api";

const registerRules = [
  {
    field: "nombre",
    test: (v) => v.trim().length >= 2,
    msg: "El nombre debe tener al menos 2 caracteres.",
  },
  {
    field: "apellido",
    test: (v) => v.trim().length >= 2,
    msg: "El apellido debe tener al menos 2 caracteres.",
  },
  {
    field: "email",
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    msg: "El email no es válido.",
  },
  {
    field: "password",
    test: (v) => v.length >= 4,
    msg: "La contraseña debe tener al menos 4 caracteres.",
  },
  {
    field: "documento",
    test: (v) => /^\d{7,}$/.test(v),
    msg: "El documento debe ser numérico y tener al menos 7 dígitos.",
  },
  {
    field: "telefono",
    test: (v) => /^\d{6,}$/.test(v),
    msg: "El teléfono debe ser numérico y tener al menos 6 dígitos.",
  },
];

export function LoginRegister() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    documento: "",
    telefono: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginForm);
      loginUser(response.data);
      navigate("/Inicio");
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Credenciales inválidas");
    }
  };

  const handleRegisterChange = (e) => {
    e.target.setCustomValidity("");
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    for (const { field, test, msg } of registerRules) {
      if (!test(registerForm[field])) {
        form[field].setCustomValidity(msg);
        form[field].reportValidity();
        return;
      }
    }

    try {
      const { status, data } = await register(registerForm);
      if (status === 201) {
        loginUser(data);
        navigate("/Inicio");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      const backendMsg =
        error.response?.data?.message || "Error al crear usuario";
      form.telefono.setCustomValidity(backendMsg);
      form.telefono.reportValidity();
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

            {/* LOGIN */}
            <div className="login">
              <form
                className="login-form"
                onSubmit={handleLogin}
                autoComplete="off"
              >
                <label className="login-label" htmlFor="chk" aria-hidden="true">
                  Iniciar sesión
                </label>
                <input
                  className="login-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  autoComplete="new-email"
                />
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  required
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  autoComplete="new-password"
                />
                <button type="submit">Iniciar sesión</button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>
            </div>

            {/* REGISTRO */}
            <div className="register">
              <form
                className="login-form"
                onSubmit={handleRegister}
                autoComplete="off"
              >
                <label className="login-label" htmlFor="chk" aria-hidden="true">
                  Creá tu cuenta
                </label>
                <input
                  className="login-input"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  value={registerForm.nombre}
                  onChange={handleRegisterChange}
                />
                <input
                  className="login-input"
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  required
                  value={registerForm.apellido}
                  onChange={handleRegisterChange}
                />
                <input
                  className="login-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="new-email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                />
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  required
                  autoComplete="new-password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                <input
                  className="login-input"
                  type="text"
                  name="documento"
                  placeholder="Documento"
                  required
                  value={registerForm.documento}
                  onChange={handleRegisterChange}
                />
                <input
                  className="login-input"
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  value={registerForm.telefono}
                  onChange={handleRegisterChange}
                />
                <button type="submit">Crear</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
