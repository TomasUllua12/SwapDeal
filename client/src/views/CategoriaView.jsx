import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FooterWave from "../components/Footers/FooterWave";
import { Header } from "../components/Header";
import Articulo from "../components/Articulo";
import { getArticulosByCategoria } from "../services/api";
import useAuth from "../context/useAuth";
import "./CategoriaView.css";

function CategoriaView() {
  const { categoria } = useParams();
  const decodedCategoria = decodeURIComponent(categoria)
    .replace(/-/g, " ")
    .toLowerCase();
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const res = await getArticulosByCategoria(
          decodedCategoria,
          usuario.documento
        );
        setArticulos(res.data);
      } catch (error) {
        console.error("Error al obtener artículos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.documento) {
      fetchArticulos();
    }
  }, [decodedCategoria, usuario]);

  return (
    <>
      <main className="categoria-main">
        <section className="main-categoria-banner">
          <div className="main-categoria-banner__image">
            <Header />
            <h2 className="categoria-title">Categoría: {decodedCategoria}</h2>
          </div>
        </section>

        <div className="scrollable-contnt">
          {loading ? (
            <p className="loading">Cargando artículos...</p>
          ) : articulos.length === 0 ? (
            <p className="no-results">
              No hay artículos disponibles en esta categoría.
            </p>
          ) : (
            articulos.map((articulo) => (
              <Articulo key={articulo.id} articulo={articulo} />
            ))
          )}
        </div>
      </main>
      <FooterWave />
    </>
  );
}

export default CategoriaView;
