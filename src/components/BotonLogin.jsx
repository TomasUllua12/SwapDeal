import React from "react";
import "./BotonLogin.css";
import { Link } from "react-router-dom";

function BotonLogin() {
  return (
    <>
      <Link to={"/Login"}>
        <a href="" className="header--button">
          Comienza aquí ahora<span></span>{" "}
        </a>
      </Link>
    </>
  );
}

export default BotonLogin;
