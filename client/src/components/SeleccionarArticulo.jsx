import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAuth from "../context/useAuth";
import "./SeleccionarArticulo.css";

function SeleccionarArticulo({ onSeleccionar }) {
  const { usuario } = useAuth();
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/articulos/usuario/${usuario.documento}`
        );
        if (!response.ok) throw new Error("Error al obtener artículos");
        const data = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error("Error al cargar artículos del usuario:", error);
      }
    };

    if (usuario?.documento) {
      fetchArticulos();
    }
  }, [usuario?.documento]);

  return (
    <div className="seleccionar-articulo">
      <h2 className="sele">Selecciona un artículo para permutar</h2>
      <ul>
        {articulos.map((articulo) => (
          <li
            className="ar"
            key={articulo.id}
            onClick={() => onSeleccionar(articulo.id)}
          >
            {articulo.titulo}
          </li>
        ))}
      </ul>
      <button className="bot" onClick={() => window.history.back()}>
        Cancelar
      </button>
    </div>
  );
}

SeleccionarArticulo.propTypes = {
  onSeleccionar: PropTypes.func.isRequired,
};

export default SeleccionarArticulo;
