import React, { useState, useContext } from "react";
import "./CargarArticulo.css";
import axios from "axios";
import UserContext from "../context/UserContext.jsx"; 
import { Link } from "react-router-dom";

export function CargarArticulo(props) {
    const { user } = useContext(UserContext);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tiempoUso, setTiempoUso] = useState("");
    const [imagen, setImagen] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('categoria', categoria);
        formData.append('tiempo_uso', tiempoUso);
        formData.append('imagen', imagen);
        formData.append('id_usuario', user.documento); // Asigna el ID del usuario logueado

        try {
            const response = await axios.post("http://localhost:3002/articulo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Artículo cargado exitosamente");
        } catch (error) {
            console.error("Error al cargar el artículo:", error);
            alert("Error al cargar el artículo");
        }
    };

    return (
        <>
            <div className='body-cargarArticulo'>
                <p className='text-cargar'>Cargar información del artículo</p>

                    <Link to="/Perfil">
                    <a href="" className="volver-carga">Volver al perfil</a>
                    </Link>

                <div className='formu-carga'>
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
                                <option className='optio' value="" disabled selected>Seleccionar categoría</option>
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
                                placeholder="Ingresa el tiempo de uso"
                                value={tiempoUso}
                                onChange={(e) => setTiempoUso(e.target.value)}
                            />
                        </div>

                        <div className="descrip">
                            <label htmlFor="description">Descripción:</label>
                            <input
                                className='inpu-des'
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
            </div>
        </>
    );
}