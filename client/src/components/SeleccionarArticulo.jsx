import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import './SeleccionarArticulo.css';

function SeleccionarArticulo({ onSeleccionar }) {
    const { user } = useContext(UserContext);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        const fetchArticulos = async () => {
            const response = await fetch(`http://localhost:3002/usuario/${user.documento}/articulo`);
            const data = await response.json();
            setArticulos(data);
        };

        fetchArticulos();
    }, [user.documento]);

    return (
        <div className="seleccionar-articulo">
            <h2>Selecciona un artículo para permutar</h2>
            <ul>
                {articulos.map(articulo => (
                    <li key={articulo.id} onClick={() => onSeleccionar(articulo.id)}>
                        {articulo.titulo}
                    </li>
                ))}
            </ul>
            <button onClick={() => window.history.back()}>Cancelar</button>
        </div>
    );
}

export default SeleccionarArticulo;