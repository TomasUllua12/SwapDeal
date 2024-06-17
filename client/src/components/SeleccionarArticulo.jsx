import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

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
        <div>
            <h2>Selecciona un artículo para permutar</h2>
            <ul>
                {articulos.map(articulo => (
                    <li key={articulo.id}>
                        {articulo.titulo}
                        <button onClick={() => onSeleccionar(articulo.id)}>Seleccionar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeleccionarArticulo;