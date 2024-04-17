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
                                
                            </a>
                        </figure>
                    </div>
                    <div class="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
                    </div>
                    <div class="box">
                        <h2>ENCONTRANOS EN</h2>
                        <div class="red-social">
                            <div><a href="#" class="fa fa-facebook"></a></div>
                            <div><a href="#" class="fa fa-twitter"></a></div>
                            <div><a href="#" class="fa fa-intagram"></a></div>
                            <div><a href="#" class="fa fa-youtube"></a></div>
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