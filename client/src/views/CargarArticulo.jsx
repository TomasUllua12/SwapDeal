import React from 'react'
import "./CargarArticulo.css";

export function CargarArticulo(props) {
    

    return (
        <>
            <div className='body-cargarArticulo'>
                
                <p className='text-cargar'>Cargar informacion del articulo</p>

                <div className='formu-carga'>

                    <div className='espacio-fo'>
                        <div class="image-upload-container" id="upload-container">
                            <input type="file" accept="image/*" id="image-input" />
                            
                        </div>
                    </div>

                    <div className='formulario'>
                        <div className="titu">
                            <label htmlFor="title">Título:</label>
                            <input className='inpu-ti' type="text" id="title" name="title" required  placeholder="Ingresa el título del artículo"/>
                        </div>

                        
                    <div className="cate">
                            <label htmlFor="category">Categoría:</label>
                            <select className='caja' id="category" name="category" required>
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
                            <input className='inpu-ti' type="text" id="usage-time" name="usage-time" required  placeholder="Ingresa el tiempo de uso" />
                        </div>

                        <div className="descrip">
                            <label htmlFor="description">Descripción:</label>
                            <input className='inpu-ti' type="text" id="usage-time" name="usage-time" required  placeholder="Ingresa el tiempo de uso" />
                        </div>
                        


                    </div>

                </div>
                
            </div>
        </>
    )
}
