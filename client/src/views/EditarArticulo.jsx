import React, { useState, useEffect, useContext } from "react";
import "./EditarArticulo.css";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

function EditarArticulo() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiempoUso, setTiempoUso] = useState("");
  const [imagen, setImagen] = useState(null);
  const [existingImagen, setExistingImagen] = useState("");
  const [estado, setEstado] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3002/articulo/${id}`
        );
        const articulo = response.data;
        setTitulo(articulo.titulo);
        setDescripcion(articulo.descripcion);
        setCategoria(articulo.categoria);
        setTiempoUso(articulo.tiempo_uso);
        setExistingImagen(articulo.imagen);
        setEstado(articulo.estado);
        setEstado(articulo.estado);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the article:", error);
        setLoading(false);
      }
    };
    fetchArticulo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("tiempo_uso", tiempoUso);
    formData.append("id_usuario", user.documento);
    formData.append("imagen", existingImagen);
    if (imagen) {
      formData.append("imagen", imagen);
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3002/articulo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccessMessage("Artículo actualizado exitosamente");
      setErrorMessage(""); // Limpiar mensaje de error si hubiera alguno
      setLoading(false);
      alert("Artículo modificado exitosamente");
      navigate(`/ArticuloView/${id}`);
    } catch (error) {
      console.error("Error al actualizar el artículo:", error);
      setSuccessMessage(""); // Limpiar mensaje de éxito si hubiera alguno
      setErrorMessage("Error al actualizar el artículo");
      setLoading(false);
    }
  };

  const handleEliminarArticulo = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3002/articulo/${id}`
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccessMessage("Artículo eliminado exitosamente");
      setErrorMessage(""); // Limpiar mensaje de error si hubiera alguno
      setLoading(false);
      alert("Artículo eliminado exitosamente");
      navigate("/Perfil"); // Redirigir al perfil después de eliminar
    } catch (error) {
      console.error("Error al eliminar el artículo:", error);
      setSuccessMessage(""); // Limpiar mensaje de éxito si hubiera alguno
      setErrorMessage("Error al eliminar el artículo");
      setLoading(false);
    }
  };

  const toggleEstado = async () => {
    const nuevoEstado = estado === "publicado" ? "oculto" : "publicado";
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3002/articulo/${id}/estado`,
        { estado: nuevoEstado }
      );
      setEstado(nuevoEstado);
      setSuccessMessage(`Estado del artículo actualizado a ${nuevoEstado}`);
      setLoading(false);
    } catch (error) {
      console.error("Error al actualizar el estado del artículo:", error);
      setErrorMessage("Error al actualizar el estado del artículo");
      setLoading(false);
    }
  };

  useEffect(() => {
    let successTimeout;
    let errorTimeout;

    // Lógica para limpiar los mensajes después de 3 segundos
    if (successMessage) {
      successTimeout = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }

    if (errorMessage) {
      errorTimeout = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    // Limpieza de timeouts al desmontar el componente o cuando cambian los mensajes
    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [successMessage, errorMessage]);

  return (
    <>
      <div className="editarArticulo-background"></div>
      <div className="editarArticulo-wrapper"></div>
      <div className="body-editarArticulo">
        <p className="text-editar">Edita información del artículo</p>
        {loading && <p>Loading...</p>}
        {!loading && (
          <form className="formu-editar" onSubmit={handleSubmit}>
            <div className="espacio-fo">
              <div className="image-upload-container" id="upload-container">
                <label htmlFor="image-input" className="upload-label">
                  Seleccione la imágen del artículo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image-input"
                  className="upload-input"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
                {existingImagen && !imagen && (
                  <img
                    src={existingImagen}
                    alt="Current article"
                    className="current-image"
                  />
                )}
              </div>
            </div>
            <div className="formulario">
              <div className="titu">
                <label htmlFor="title">Título:</label>
                <input
                  className="inpu-ti"
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Ingresa el título del artículo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="cate">
                <label htmlFor="category">Categoría:</label>
                <select
                  className="caja"
                  id="category"
                  name="category"
                  required
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option className="optio" value="" disabled>
                    Seleccionar categoría
                  </option>
                  <option className="optio" value="hogar-y-muebles">
                    Hogar y Muebles
                  </option>
                  <option className="optio" value="tecnologia">
                    Tecnología
                  </option>
                  <option className="optio" value="moda-y-accesorios">
                    Moda y Accesorios
                  </option>
                  <option className="optio" value="deportes">
                    Deportes
                  </option>
                  <option className="optio" value="entretenimiento">
                    Entretenimiento
                  </option>
                  <option className="optio" value="vehiculos">
                    Vehículos
                  </option>
                  <option className="optio" value="herramientas-y-materiales">
                    Herramientas y Materiales
                  </option>
                  <option className="optio" value="salud-y-belleza">
                    Salud y Belleza
                  </option>
                  <option className="optio" value="mascotas">
                    Mascotas
                  </option>
                  <option className="optio" value="variedades">
                    Variedades
                  </option>
                </select>
              </div>
              <div className="uso">
                <label htmlFor="usage-time">Tiempo de uso:</label>
                <input
                  className="inpu-us"
                  type="text"
                  id="usage-time"
                  name="usage-time"
                  required
                  placeholder="Ej. 3 meses de uso"
                  value={tiempoUso}
                  onChange={(e) => setTiempoUso(e.target.value)}
                />
              </div>
              <div className="descripcion">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  className="descrip"
                  id="description"
                  name="description"
                  required
                  placeholder="Escribe una descripción del artículo"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="botones">
                <button className="boton-publi" type="submit">
                  Guardar cambios
                </button>
                <button
                  className="boton-eliminar"
                  onClick={handleEliminarArticulo}
                >
                  Eliminar artículo
                </button>
                <button
                  className="boton-estado"
                  type="button"
                  onClick={toggleEstado}
                >
                  {estado === "publicado" ? "Ocultar" : "Publicar"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default EditarArticulo;
