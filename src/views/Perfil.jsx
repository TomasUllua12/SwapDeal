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
                <div class="cartera">
                    <div class="cartera-intercambio">cartera de intercambio</div>
                    <div class="cantidad-articulos">13 articulos</div>
                    <div class="articulo1">
                        <div class="categoria1">musica</div>
                        <div class="producto1">piano</div>
                        <div class="boton-ver-1">ver producto</div>
                    </div>
                    <div class="articulo2">
                        <div class="categoria2">cocina</div>
                        <div class="producto2">sarten</div>
                        <div class="boton-ver-2">ver producto</div>
                    </div>
                    <div class="articulo3">
                        <div class="categoria3">musica</div>
                        <div class="producto3">guitarra</div>
                        <div class="boton-verde-3">ver producto</div>
                    </div>
                    <div class="articulo4">
                        <div class="categoria4">autos</div>
                        <div class="producto4">rueda</div>
                        <div class="boton-ver-4">ver producto</div>
                    </div>
                    <div class="flecha-mas">flecha</div>
                </div>
                <div class="informacion-usuario">
                    <div class="nombre-usuario">simon</div>
                    <div class="reputacion">5 estrellas</div>
                    <div class="foto-perfil">
                        <img src='../../public/assets/img/images.jpeg'></img>
                    </div>
                </div>
                <div class="agregado"></div>
                <div class="agregado2"></div>
            </div>

            <FooterWave />
        </>
    )
}
