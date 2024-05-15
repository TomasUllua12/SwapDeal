import React from "react";
import "./CardCategoria.css";
import { Link } from "react-router-dom";

export function CardCategoria({
  title = "titulo por defecto",
  color = "#470000",
}) {
  return (
    <>
      <div className="categoria-card">
        <Link to={"/Inicio"} className="categoria-card-links">
          <div
            className="categoria-card-header"
            style={{ backgroundColor: color }}
          >
            <h3 className="categoria-card-header-title">{title}</h3>
          </div>
        </Link>

        <div className="categoria-card-image"></div>
      </div>
    </>
  );
}
