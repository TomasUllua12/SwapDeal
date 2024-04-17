import React from 'react'
import "./Footer.css";

export function Footer(props) {
    

    return (
        <>
            <footer class="pie-pagina">
                <div class="grupo-1">
                    <div class="box">
                        <figure>
                            <a href="#">
                                <img scr="../../public/assets/icons/LogoynombreSwapDealBlanco.svg" alt="Logo SwapDeal"/>
                            </a>
                        </figure>
                    </div>
                    <div class="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>¡Intercambia lo que ya no usas!</p>
                        <p>En SwapDeal encuentras lo que buscas sin gastar dinero.</p>
                        <p>Gratis, fácil y seguro. ¡Empieza a permutar hoy mismo!</p>
                    </div>
                    <div class="box">
                        <h2>ENCONTRANOS EN</h2>
                        <div class="red-social">
                            <div><a href="#" class="fab fa-facebook"></a></div>
                            <div><a href="#" class="fab fa-twitter"></a></div>
                            <div><a href="#" class="fab fa-intagram"></a></div>
                            <div><a href="#" class="fab fa-youtube"></a></div>
                        </div>
                    </div>
                </div>
                <div class="grupo-2">
                    <small>&copy; 2024 <b>SwapDeal</b> - Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </>
    )
}

export default Footer;