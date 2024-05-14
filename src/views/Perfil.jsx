import React from 'react'
import "./Perfil.css"
import { Header } from "../components/Header"
import FooterWave from "../components/Footers/FooterWave";

export function Perfil(props) {
    

    return (
        <>
            <Header></Header>

            <div class="container">
                <div class="foto-fondo">
                    <img className='fondo-perfil' src='../../public/assets/img/fondoPerfil3.png'></img>
                </div>
                <div className="cartera">
                    <div className="cartera-intercambio">cartera de intercambio</div>
                    <div className="cantidad-articulos">13 articulos</div>
                    <div className="articulo1">
                        <div className="categoria1">musica</div>
                        <div className="producto1">piano</div>
                        <div className="boton-ver-1">ver producto</div>
                    </div>
                    <div className="articulo2">
                        <div className="categoria2">cocina</div>
                        <div className="producto2">sarten</div>
                        <div className="boton-ver-2">ver producto</div>
                    </div>
                    <div className="articulo3">
                        <div className="categoria3">musica</div>
                        <div className="producto3">guitarra</div>
                        <div className="boton-verde-3">ver producto</div>
                    </div>
                    <div className="articulo4">
                        <div className="categoria4">autos</div>
                        <div className="producto4">rueda</div>
                        <div className="boton-ver-4">ver producto</div>
                    </div>
                    <div className="flecha-mas">flecha</div>
                </div>
                <div className="informacion-usuario">
                    <div className="nombre-usuario">simon</div>
                    <div className="reputacion">5 estrellas</div>
                    <div className="foto-perfil">
                        <img classNameName='foto-p' src='../../public/assets/img/images.jpeg'></img>
                    </div>
                </div>
                <div className="agregado"></div>
                <div className="agregado2"></div>
            </div>

            <FooterWave />
        </>
    )
}
