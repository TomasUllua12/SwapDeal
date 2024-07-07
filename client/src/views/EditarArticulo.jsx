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
  const [previewImagen, setPreviewImagen] = useState(""); // Nuevo estado para la vista previa de la imagen
  const [estado, setEstado] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
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
        setPreviewImagen(articulo.imagen); // Establecer la imagen existente como vista previa inicial
        setEstado(articulo.estado);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the article:", error);
        setLoading(false);
      }
    };
    fetchArticulo();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreviewImagen(URL.createObjectURL(file)); // Actualizar la vista previa de la imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("tiempo_uso", tiempoUso);
    formData.append("id_usuario", user.documento);
    if (imagen) {
      formData.append("imagen", imagen);
    } else {
      formData.append("imagen", existingImagen);
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
      setMensajeExito("Artículo actualizado exitosamente");
      setLoading(false);
      setTimeout(() => {
        navigate("/Perfil");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el artículo:", error);
      setMensajeError("Error al actualizar el artículo");
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
      setMensajeExito("Artículo eliminado exitosamente");
      setLoading(false);
      setTimeout(() => {
        navigate("/Perfil");
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar el artículo:", error);
      setMensajeError("Error al eliminar el artículo");
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
      setMensajeExito(`Estado del artículo actualizado a ${nuevoEstado}`);
      setLoading(false);
    } catch (error) {
      console.error("Error al actualizar el estado del artículo:", error);
      setMensajeError("Error al actualizar el estado del artículo");
      setLoading(false);
    }
  };

  useEffect(() => {
    let successTimeout;
    let errorTimeout;

    if (mensajeExito) {
      successTimeout = setTimeout(() => {
        setMensajeExito("");
      }, 2000);
    }

    if (mensajeError) {
      errorTimeout = setTimeout(() => {
        setMensajeError("");
      }, 2000);
    }

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [mensajeExito, mensajeError]);

  return (
    <>
      <div className="editarArticulo-background"></div>
      <div className="editarArticulo-wrapper"></div>
      <div className="body-editarArticulo">
        <p className="text-editarArticulo">Edita información del artículo</p>
        {loading && <p>Loading...</p>}
        {!loading && (
          <form className="formu-editarArticulo" onSubmit={handleSubmit}>
            <div className="espacio-foArticulo">
            <div className="espacio-foArticulo">
                <div className="image-upload-container" id="upload-container">
                  <label htmlFor="image-input" className="upload-labelArticulo">
                    <span className="selec">Seleccione la imágen del artículo</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    className="upload-input"
                    onChange={handleFileChange}
                  />
                </div>
                {previewImagen && (
                  <div className="image-container">
                    <img
                      src={previewImagen}
                      alt="Vista previa del artículo"
                      className="current-image"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="formulario-editarArticulo">
              <div className="titu">
                <label htmlFor="title"><span className="tie">Título:</span></label>
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
                <label htmlFor="category"><span className="tie">Categoria</span></label>
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
                <label  htmlFor="usage-time"><span className="tie">Tiempo de uso:</span></label>
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
                <label htmlFor="description" className="desc">Descripción:</label>
                <textarea
                  rows="7"
                  cols="51"
                  maxLength="300"
                  className="descrip"
                  id="description"
                  name="description"
                  required
                  placeholder="Escribe una descripción del artículo"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
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