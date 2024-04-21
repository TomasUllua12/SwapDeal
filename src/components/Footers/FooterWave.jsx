import React from 'react'
import "./FooterWave.css";

export function FooterWave(props) {


    return (
        <>
            <footer class="footer">
                <div class="waves">
                    <div class="wave" id="wave1"></div>
                    <div class="wave" id="wave2"></div>
                    <div class="wave" id="wave3"></div>
                    <div class="wave" id="wave4"></div>
                </div>
                <img class="footer-logo" src="../../public/assets/img/Logo SwapDeal Blanco.svg"></img>
                <ul class="menu">
                    <li class="menu__item"><a class="menu__link" href="#">Inicio</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Categorías</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Chat</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Ayuda</a></li>

                </ul>
                <p>&copy;2024 <b>SwapDeal</b> | Todos los Derechos Reservados.</p>
            </footer>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default FooterWave;