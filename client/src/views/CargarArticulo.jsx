import React, { useState, useContext, useEffect } from "react";
import "./CargarArticulo.css";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export function CargarArticulo(props) {
  const { user } = useContext(UserContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiempoUso, setTiempoUso] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(""); // Nuevo estado para el mensaje de éxito
  const navigate = useNavigate(); // Hook de navegación para redirigir al perfil

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("tiempo_uso", tiempoUso);
    formData.append("imagen", imagen);
    formData.append("id_usuario", user.documento);
    try {
      const response = await axios.post(
        "http://localhost:3002/articulo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setMensajeExito("Artículo cargado exitosamente"); // Establecer el mensaje de éxito
      setTimeout(() => {
        navigate("/Perfil"); // Redirigir al perfil después de 2 segundos
      }, 1500);
    } catch (error) {
      console.error("Error al cargar el artículo:", error);
      setMensajeExito("Error al cargar el artículo"); // Establecer el mensaje de error
    }
  };

  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => {
        setMensajeExito("");
        navigate("/Perfil");
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [mensajeExito, navigate]);

  return (
    <>
      <div className="cargarArticulo-background"></div>
      <div className="cargarArticulo-wrapper"></div>
      <div className="body-cargarArticulo">
        <p className="text-cargar">Cargar información del artículo</p>

        <Link to="/Perfil">
          <a href="" className="volver-carga">
            Volver al perfil
          </a>
        </Link>

        <div className="formu-carga">
          <div className="espacio-fo">
            <div className="image-upload-containerr" id="upload-container">
              {imagenPreview ? (
                <img
                  src={imagenPreview}
                  alt="Vista previa de la imagen"
                  className="preview-image"
                />
              ) : (
                <label htmlFor="image-input" className="upload-label">
                  Seleccione la imagen del artículo
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                id="image-input"
                className="upload-inputt"
                onChange={handleFileChange}
              />
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
                <option className="optio" value="" disabled selected>
                  Seleccionar categoría
                </option>
                <option className="optio" value="hogar y Muebles">
                  Hogar y Muebles
                </option>
                <option className="optio" value="tecnología">
                  Tecnología
                </option>
                <option className="optio" value="moda y Accesorios">
                  Moda y Accesorios
                </option>
                <option className="optio" value="deportes">
                  Deportes
                </option>
                <option className="optio" value="entretenimiento">
                  Entretenimiento
                </option>
                <option className="optio" value="vehículos">
                  Vehículos
                </option>
                <option className="optio" value="herramientas y Materiales">
                  Herramientas y Materiales
                </option>
                <option className="optio" value="salud y Belleza">
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
                placeholder="Ingresa el tiempo de uso"
                value={tiempoUso}
                onChange={(e) => setTiempoUso(e.target.value)}
              />
            </div>

            <div className="descri">
              <label htmlFor="description"><span className="des">Descripción:</span></label>
              <input
                className="inpu-des"
                type="text"
                id="description"
                name="description"
                placeholder="Ingresa la descripción del artículo"
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="envia" onClick={handleSubmit}>
          Cargar Artículo
        </button>

        {mensajeExito && (
          <div className="mensaje-exito">
            <p>{mensajeExito}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default CargarArticulo;