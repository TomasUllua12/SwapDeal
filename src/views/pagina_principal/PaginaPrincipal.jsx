import React from 'react'
import "./PaginaPrincipal.css"
import FooterWave from '../../components/Footers/FooterWave'
import BotonLogin from "../../components/BotonLogin"

export function PaginaPrincipal(props) {


    return (
        <>
            <header>
                <img src="../../../public/assets/icons/LogoynombreSwapDeal.svg" alt="" />
                <div className="header--title-container">
                    <h1>Tu Plataforma Segura de Intercambio</h1>
                    <p>
                        SwapDeal te guía a través del laberinto de intercambios seguros y rentables.
                    </p>
                </div>
                <BotonLogin/>
            </header>
            <main>
                <section id="plans" className="main-plans-container">
                    <div className="plans--title">
                        <h2>Escoge el plan que mejor se ajuste a ti.</h2>
                        <p>Cualquier plan te da acceso completo a nuestra plataforma.</p>
                    </div>
                </section>
                <section className="main-product-detail">
                    <span className="product-detail--batata-logo"></span>
                    <div className="product-detail--title">
                        <h2>Creamos un producto sin comparación.</h2>
                        <p>Confiable y diseñado para su uso diario.</p>
                    </div>
                    <section className="product-cards--container">
                        <article className="product-detail--card">
                            <span className="icon-card clock"></span>
                            <p className="product--card-title">Tiempo real</p>
                            <p className="product--card-body">
                                Nuestro API toma información minuto a minuto
                                sobre las tasas que más determinan el comportamiento.
                            </p>
                        </article>
                        <article className="product-detail--card">
                            <span className="icon-card eye"></span>
                            <p className="product--card-title">No hay tasas escondidas</p>
                            <p className="product--card-body">
                                Ni en la compra o al momento de exit, Batabit siempre
                                te muestra el costo real de lo que estás adquiriendo.
                            </p>
                        </article>
                        <article className="product-detail--card">
                            <span className="icon-card money"></span>
                            <p className="product--card-title">Compara monedas</p>
                            <p className="product--card-body">
                                No más rumores, con Babtabit sabrás el valor real de
                                cada moneda en el mercado actual.
                            </p>
                        </article>
                        <article className="product-detail--card">
                            <span className="icon-card tick"></span>
                            <p className="product--card-title">Información confiable</p>
                            <p className="product--card-body">
                                Nuestras fuentes están 100% verificadas y
                                continuamos auditando su contenido mientras se actualizan.
                            </p>
                        </article>
                    </section>
                </section>
                <section className="bitcoin-img-container">
                    <h2>Conócelo Ahora.</h2>
                </section>
                <section className="main-exchange-container">
                    <div className="backgroundImg"></div>
                    <div className="main-exchange-container--title">
                        <h2>Visibilizamos todas las tasas de cambio.</h2>
                        <p>Traemos información en tiempo real de las casas
                            de cambio y las monedas más importantes del mundo.</p>
                    </div>
                </section>
            </main>
            <FooterWave />
        </>
    )
}

export default PaginaPrincipal
