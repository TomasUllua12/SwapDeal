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

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/articulo/${id}`);
                const articulo = response.data;
                setTitulo(articulo.titulo);
                setDescripcion(articulo.descripcion);
                setCategoria(articulo.categoria);
                setTiempoUso(articulo.tiempo_uso);
                setExistingImagen(articulo.imagen);
            } catch (error) {
                console.error("Error fetching the article:", error);
            }
        };
        fetchArticulo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('categoria', categoria);
        formData.append('tiempo_uso', tiempoUso);
        formData.append('id_usuario', user.documento);  // Asegúrate de enviar el ID del usuario
        formData.append('imagen', existingImagen); // Pasar la imagen existente
        if (imagen) {
            formData.append('imagen', imagen); // Sobrescribir si hay una nueva imagen
        }
        try {
            const response = await axios.put(`http://localhost:3002/articulo/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Respuesta del servidor:", response.data);
            alert("Artículo actualizado exitosamente");
            navigate(`/ArticuloView/${id}`);
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
            alert("Error al actualizar el artículo");
        }
    };

    return (
        <div className='body-editarArticulo'>
            <p className='text-editar'>Editar información del artículo</p>
            <form className='formu-editar' onSubmit={handleSubmit}>
                <div className='espacio-fo'>
                    <div className="image-upload-container" id="upload-container">
                        <label htmlFor="image-input" className="upload-label">Seleccione la imágen del artículo</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image-input"
                            className="upload-input"
                            onChange={(e) => setImagen(e.target.files[0])}
                        />
                        {existingImagen && !imagen && (
                            <img src={existingImagen} alt="Current article" className="current-image" />
                        )}
                    </div>
                </div>
                <div className='formulario'>
                    <div className="titu">
                        <label htmlFor="title">Título:</label>
                        <input
                            className='inpu-ti'
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
                            className='caja'
                            id="category"
                            name="category"
                            required
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option className='optio' value="" disabled>Seleccionar categoría</option>
                            <option className='optio' value="hogar-y-muebles">Hogar y Muebles</option>
                            <option className='optio' value="tecnologia">Tecnología</option>
                            <option className='optio' value="moda-y-accesorios">Moda y Accesorios</option>
                            <option className='optio' value="deportes">Deportes</option>
                            <option className='optio' value="entretenimiento">Entretenimiento</option>
                            <option className='optio' value="vehiculos">Vehículos</option>
                            <option className='optio' value="herramientas-y-materiales">Herramientas y Materiales</option>
                            <option className='optio' value="salud-y-belleza">Salud y Belleza</option>
                            <option className='optio' value="mascotas">Mascotas</option>
                            <option className='optio' value="variedades">Variedades</option>
                        </select>
                    </div>
                    <div className="uso">
                        <label htmlFor="usage-time">Tiempo de uso:</label>
                        <input
                            className='inpu-us'
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
                            className='descrip'
                            id="description"
                            name="description"
                            required
                            placeholder="Escribe una descripción del artículo"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="boton-publicar">
                        <button className='boton-publi' type="submit">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarArticulo;