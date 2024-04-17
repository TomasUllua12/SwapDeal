import React from 'react'
import "./PaginaPrincipal.css"

export function PaginaPrincipal(props) {
    

    return (
        <>
        <header>
        <img src="../../../public/assets/icons/LogoynombreSwapDeal.svg" alt=""/>
        <div class="header--title-container">
            <h1>Tu Plataforma Segura de Intercambio</h1>
            <p>
                SwapDeal te guía a través del laberinto de intercambios seguros y rentables.
            </p>
            <a href="#plans" class="header--button">Comienza aquí ahora<span></span> </a>
        </div>
        </header>
        <main>
            <section class="main-exchange-container">
                <div class="backgroundImg"></div>
                <div class="main-exchange-container--title">
                    <h2>Visibilizamos todas las tasas de cambio.</h2>
                    <p>Traemos información en tiempo real de las casas 
                        de cambio y las monedas más importantes del mundo.</p>
                </div>
                <section class="main-tables-container">
                    <div class="main-currency-table">
                        <p class="currency-table--title">Iniciar Sesión</p>

                        <div class="currency-container">
                            <div class="item top-left"><div>Bitcoin</div></div>
                            <div class="item"><div>Ethereum</div></div>
                            <div class="item"><div>Ripple</div></div>
                            <div class="item bottom-left"><div>Stellar</div></div>
                            <div class="item price top-right"><div>$1.96 <span class="down"></span></div></div>
                            <div class="item price"><div>$0.07 <span class="up"></span></div></div>
                            <div class="item price"><div>$2.17 <span class="down"></span></div></div>
                            <div class="item price bottom-right"><div>$4.96 <span class="down"></span></div></div>
                        </div>

                        <div class="currency-table--date">
                            <p><b>Actualizado: </b>19 Julio 23:45</p>
                        </div>
                    </div>
                    <div class="main-comissions-table">
                        <p class="comissions-table--title">Regístrate</p>
                        <div class="comissions-table--container">
                            <table>
                                <tr>
                                    <td class="table__top-left">Bitrade</td>
                                    <td class="table__top-right table__right">$12.96</td>
                                </tr>
                                <tr>
                                    <td>Bitpreco</td>
                                    <td class="table__right">$13.07</td>
                                </tr>
                                <tr>
                                    <td>Novadex</td>
                                    <td class="table__right">$13.15</td>
                                </tr>
                                <tr>
                                    <td class="table__bottom-left">Coinext</td>
                                    <td class="table__bottom-right table__right">$14.96</td>
                                </tr>
                            </table>
                        </div>
                        <div class="comissions-table--date">
                            <p><b>Actualizado: </b>19 Julio 23:45</p>
                        </div>
                    </div>
                </section>
            </section>
            <section class="main-product-detail">
                <span class="product-detail--batata-logo"></span>
                <div class="product-detail--title">
                    <h2>Creamos un producto sin comparación.</h2>
                    <p>Confiable y diseñado para su uso diario.</p>
                </div>
                <section class="product-cards--container">
                    <article class="product-detail--card">
                        <span class="icon-card clock"></span>
                        <p class="product--card-title">Tiempo real</p>
                        <p class="product--card-body">
                            Nuestro API toma información minuto a minuto 
                            sobre las tasas que más determinan el comportamiento.
                        </p>
                    </article>
                    <article class="product-detail--card">
                        <span class="icon-card eye"></span>
                        <p class="product--card-title">No hay tasas escondidas</p>
                        <p class="product--card-body">
                            Ni en la compra o al momento de exit, Batabit siempre 
                            te muestra el costo real de lo que estás adquiriendo.
                        </p>
                    </article>
                    <article class="product-detail--card">
                        <span class="icon-card money"></span>
                        <p class="product--card-title">Compara monedas</p>
                        <p class="product--card-body">
                            No más rumores, con Babtabit sabrás el valor real de 
                            cada moneda en el mercado actual.
                        </p>
                    </article>
                    <article class="product-detail--card">
                        <span class="icon-card tick"></span>
                        <p class="product--card-title">Información confiable</p>
                        <p class="product--card-body">
                            Nuestras fuentes están 100% verificadas y 
                            continuamos auditando su contenido mientras se actualizan.
                        </p>
                    </article>
                </section>
            </section>
            <section class="bitcoin-img-container">
                <h2>Conócelo Ahora.</h2>
            </section>
            <section id="plans" class="main-plans-container">
                <div class="plans--title">
                    <h2>Escoge el plan que mejor se ajuste a ti.</h2>
                    <p>Cualquier plan te da acceso completo a nuestra plataforma.</p>
                </div>
                <section class="plans-container--slider">
                    <article class="plans-container--card">
                        <p class="basic">Básico</p>
                        <div class="plan-info-container">
                            <h3 class="plan-card--title">Pago Anual</h3>
                            <p class="plan-card--price"><span>$</span> 49</p>
                            <p class="plan-card--saving">* Ahorras $99 comparado al plan mensual.</p>
                            <button class="plan-card--ca">Escoger este <span></span></button>
                        </div>
                    </article>
                    <article class="plans-container--card">
                        <p class="recommended">Recomendado</p>
                        <div class="plan-info-container">
                            <h3 class="plan-card--title">Pago Anual</h3>
                            <p class="plan-card--price"><span>$</span> 99</p>
                            <p class="plan-card--saving">* Ahorras $129 comparado al plan mensual.</p>
                            <button class="plan-card--ca">Escoger este <span></span></button>
                        </div>
                    </article>
                    <article class="plans-container--card">
                        <p class="business">Business</p>
                        <div class="plan-info-container">
                            <h3 class="plan-card--title">Pago Anual</h3>
                            <p class="plan-card--price"><span>$</span> 149</p>
                            <p class="plan-card--saving">* Ahorras $169 comparado al plan mensual.</p>
                            <button class="plan-card--ca">Escoger este <span></span></button>
                        </div>
                    </article>
                </section>
            </section>
        </main>
        <footer class="footer1">
            <section class="left">
                <ul>
                    <li><a href="#">Linkedin</a></li>
                    <li><a href="#">Crunchbase</a></li>
                    <li><a href="#">Hackernews</a></li>
                </ul>
            </section>
            <section class="right">
                <img src="./assets/img/Logo SwapDeal Blanco.svg" alt="Logo de Batatabit 2020"/>
            </section>
        </footer>
        </>
    )
}

export default PaginaPrincipal
