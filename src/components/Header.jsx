import React from 'react'
import "./Header.css"

export function Header(props) {


    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo"><a href="">Web Dev Creative</a></div>
                    <ul className='links'>
                        <li><a href="">Inicio</a></li >
                        <li><a href="">Categorías</a></li >
                        <li><a href="">Permutas</a></li >
                        <li><a href="">Ayuda</a></li >
                    </ul>
                    <a href="" className="action_btn">Mi perfil</a>
                    <div className="toggle_btn">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                </div>
            </header>
        </>
    )
}
