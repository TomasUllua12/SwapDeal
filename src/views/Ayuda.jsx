import React from 'react'
import { Header } from "../components/Header"
import FooterWave from "../components/Footers/FooterWave";
import "./Ayuda.css"
import MostrarPreguntas from '../components/Preguntas';
import MostrarAcciones from '../components/Acciones';
import MostrarBlog from '../components/Blog';
import MostrarConsulta from '../components/Consulta';

export function Ayuda(props) {
    

    return (
        <>
            <Header></Header>

        
            <div className='secciones-ayuda'>
                
                <h2 className="ayuda-title">Ayuda</h2>

                <div className='preguntas-frecuentes'>
                    <MostrarPreguntas />
                </div>
                <div className='acciones-recomendadas'>
                    <MostrarAcciones />
                </div>
                <div className='ver-blog'>
                    <MostrarBlog />
                </div>
                <div className='enviar-consulta'>
                    <MostrarConsulta />
                </div>
            </div>


            <FooterWave />
        </>
    )
}
