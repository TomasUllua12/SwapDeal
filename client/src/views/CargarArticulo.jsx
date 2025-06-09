import { useState, useEffect } from "react";
import "./CargarArticulo.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { createArticulo } from "../services/api";
import { categorias } from "../data/categoriaOption";

function CargarArticulo() {
  const { usuario } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiempoUso, setTiempoUso] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setMensajeExito("Debe subir una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria.toLowerCase());
    formData.append("tiempo_uso", tiempoUso);
    formData.append("imagen", imagen);
    formData.append("id_usuario", usuario.documento);

    try {
      await createArticulo(formData);
      setMensajeExito("Artículo cargado exitosamente");
      setTimeout(() => {
        navigate("/Perfil");
      }, 1500);
    } catch (error) {
      console.error("Error al cargar el artículo:", error);
      setMensajeExito("Error al cargar el artículo");
    }
  };

  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => {
        setMensajeExito("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  return (
    <>
      <div className="cargarArticulo-background"></div>
      <div className="cargarArticulo-wrapper"></div>
      <div className="body-cargarArticulo">
        <p className="text-cargar">Cargar información del artículo</p>

        <Link to="/Perfil">
          <span className="volver-carga">Volver al perfil</span>
        </Link>

        <form className="formu-carga" onSubmit={handleSubmit}>
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
            </div>

            <div className="uso">
              <label htmlFor="usage-time">Tiempo de uso:</label>
              <input
                className="inpu-us"
                type="text"
                id="usage-time"
                required
                placeholder="Ingresa el tiempo de uso"
                value={tiempoUso}
                onChange={(e) => setTiempoUso(e.target.value)}
              />
            </div>

            <div className="descri">
              <label htmlFor="description">
                <span className="des">Descripción:</span>
              </label>
              <input
                className="inpu-des"
                type="text"
                id="description"
                placeholder="Ingresa la descripción del artículo"
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <button type="submit" className="envia">
              Cargar Artículo
            </button>
          </div>
        </form>

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
