import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import "./EditarArticulo.css";
import { categorias } from "../data/categoriaOption";

function EditarArticulo() {
  const { usuario } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiempoUso, setTiempoUso] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewImagen, setPreviewImagen] = useState("");
  const [estado, setEstado] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticulo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3002/api/articulos/${id}`
        );
        const articulo = response.data;
        setTitulo(articulo.titulo);
        setDescripcion(articulo.descripcion);
        setCategoria(articulo.categoria.toLowerCase());
        setTiempoUso(articulo.tiempo_uso);
        setPreviewImagen(articulo.imagen);
        setEstado(articulo.estado);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulo();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreviewImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria.toLowerCase());
    formData.append("tiempo_uso", tiempoUso);
    formData.append("id_usuario", usuario.documento);
    formData.append("imagen", imagen || previewImagen);

    setLoading(true);
    try {
      await axios.put(`http://localhost:3002/api/articulos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMensajeExito("Artículo actualizado exitosamente");
      setTimeout(() => navigate("/Perfil"), 2000);
    } catch (error) {
      console.error("Error updating article:", error);
      setMensajeError("Error al actualizar el artículo");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarArticulo = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3002/api/articulos/${id}`);
      setMensajeExito("Artículo eliminado exitosamente");
      setTimeout(() => navigate("/Perfil"), 2000);
    } catch (error) {
      console.error("Error deleting article:", error);
      setMensajeError("Error al eliminar el artículo");
    } finally {
      setLoading(false);
    }
  };

  const toggleEstado = async () => {
    const nuevoEstado = estado === "publicado" ? "oculto" : "publicado";
    setLoading(true);
    try {
      await axios.put(`http://localhost:3002/api/articulos/${id}/estado`, {
        estado: nuevoEstado,
      });
      setEstado(nuevoEstado);
      setMensajeExito(`Estado actualizado a ${nuevoEstado}`);
    } catch (error) {
      console.error("Error updating status:", error);
      setMensajeError("Error al actualizar el estado del artículo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mensajeExito || mensajeError) {
      const timeout = setTimeout(() => {
        setMensajeExito("");
        setMensajeError("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [mensajeExito, mensajeError]);

  return (
    <>
      <div className="editarArticulo-background"></div>
      <div className="body-editarArticulo">
        <h2 className="text-editarArticulo">Edita información del artículo</h2>

        {loading && <p>Cargando...</p>}

        {!loading && (
          <form className="formu-editarArticulo" onSubmit={handleSubmit}>
            <div className="editarArticulo-content">
              <div className="espacio-foArticulo">
                <div className="image-upload-container">
                  <label htmlFor="image-input" className="upload-labelArticulo">
                    <span className="selec">
                      Seleccione la imagen del artículo
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    className="upload-input"
                    onChange={handleFileChange}
                  />
                  {previewImagen && (
                    <div className="image-container">
                      <img
                        src={previewImagen}
                        alt="Vista previa"
                        className="current-image"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="formulario-editarArticulo">
                <label>
                  <span className="tie">Título:</span>
                  <input
                    className="inpu-ti"
                    type="text"
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </label>

                <label>
                  <span className="tie">Categoría:</span>
                  <select
                    className="caja"
                    required
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccionar categoría
                    </option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="tie">Tiempo de uso:</span>
                  <input
                    className="inpu-us"
                    type="text"
                    required
                    value={tiempoUso}
                    onChange={(e) => setTiempoUso(e.target.value)}
                  />
                </label>

                <label>
                  <span className="tie">Descripción:</span>
                  <textarea
                    className="descrip"
                    rows="7"
                    maxLength="500"
                    required
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </label>

                <div className="botoness">
                  <button className="enviaa" type="submit">
                    Guardar cambios
                  </button>
                  <button
                    className="enviaa"
                    type="button"
                    onClick={handleEliminarArticulo}
                  >
                    Eliminar artículo
                  </button>
                  <button
                    className="enviaa"
                    type="button"
                    onClick={toggleEstado}
                  >
                    {estado === "publicado" ? "Ocultar" : "Publicar"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {mensajeExito && (
          <div className="mensaje-exito">
            <p>{mensajeExito}</p>
          </div>
        )}
        {mensajeError && (
          <div className="mensaje-error">
            <p>{mensajeError}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default EditarArticulo;
