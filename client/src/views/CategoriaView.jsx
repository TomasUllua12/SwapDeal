import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import Articulo from "../components/Articulo";
import axios from "axios";
import UserContext from "../context/UserContext";
import "./CategoriaView.css";

function CategoriaView() {
const { categoria } = useParams();
  const decodedCategoria = decodeURIComponent(categoria).replace(/-/g, ' '); // Decodifica el parámetro y reemplaza guiones con espacios
const [articulos, setArticulos] = useState([]);
const { user } = useContext(UserContext);

useEffect(() => {
    const fetchArticulos = async () => {
    try {
        const response = await axios.get(`http://localhost:3002/articulos/categoria/${encodeURIComponent(decodedCategoria)}/excluyendo/${user.documento}`);
        setArticulos(response.data);
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
    };

    if (user && decodedCategoria) {
    fetchArticulos();
    }
}, [user, decodedCategoria]);

return (
    <>
    <Header />
    <main className="categoria-main">
        <div className="categoria-banner">
        <h2 className="categoria-title">{decodedCategoria}</h2>
        </div>
        <div className="scrollable-content">
        {articulos.map((articulo) => (
            <Articulo key={articulo.id} articulo={articulo} />
        ))}
        </div>
    </main>
    <FooterWave />
    </>
);
}

export default CategoriaView;