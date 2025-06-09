import "./PaginaPrincipal.css";
import FooterWavePrincipal from "../../components/Footers/FooterWavePrincipal";
import BotonLogin from "../../components/BotonLogin";

export function PaginaPrincipal() {
  return (
    <>
      <header className="header-principal">
        <img
          className="header-principal__image"
          src="../../../public/assets/icons/LogoynombreSwapDeal.svg"
          alt=""
        />
        <div className="header-principal--title-container">
          <h1 className="header-principal__title">
            ¡Intercambia lo que no usas por lo que necesitas!
          </h1>
          <p className="header-principal__description"></p>
        </div>
        <div className="background-header-color"></div>
        <video
          autoPlay
          playsInline
          muted
          loop
          className="background-header-video"
        >
          <source
            src="../../../public/assets/vids/saludosVideo.mp4"
            type="video/mp4"
          />
          Tu navegador no admite la etiqueta de video HTML5.
        </video>
        <BotonLogin />
      </header>

      <main className="main-principal">
        <section className="main-principal-section-1">
          <div className="main-principal-section-1--title">
            <h2 className="main-principal-section-1--title-text">
              ⇆ Tu plataforma de intercambios ⇆
            </h2>
            <p className="main-principal-section-1--title-description">
              <b>Swap Deal</b> es una plataforma innovadora que te permite
              intercambiar artículos
              <br /> que ya no necesitas por aquellos que deseas. Simplemente
              publica lo que tienes, <br /> busca lo que quieres y realiza el
              intercambio con otros usuarios de manera rápida <br />y segura.
              Descubre una nueva forma de obtener lo que necesitas sin gastar
              dinero.
            </p>
          </div>
        </section>

        <section className="categories-section">
          <div className="categories-section--title">
            <h2 className="categories-section--title-text">
              Categorías de artículos
            </h2>
            <p className="categories-section--title-description">
              En Swap Deal, puedes encontrar una amplia variedad de artículos
              para permutar.
              <br /> Explora nuestras categorías y descubre todo lo que puedes
              intercambiar:
            </p>
          </div>

          <section className="categories-section--cards">
            <article className="cardh">
              <p className="card-title">Hogar y Muebles</p>
              <p className="card-bodyy">
                Muebles, decoración, utensilios de cocina y más.
              </p>
            </article>
            <article className="cardt">
              <p className="card-title">Tecnología</p>
              <p className="card-bodyy">
                Teléfonos móviles, ordenadores, accesorios y más.
              </p>
            </article>
            <article className="cardm">
              <p className="card-title">Moda y Accesorios</p>
              <p className="card-bodyy">Ropa, calzado, joyas y complementos.</p>
            </article>
            <article className="cardd">
              <p className="card-title">Deportes</p>
              <p className="card-bodyy">
                Equipamiento deportivo, ropa deportiva y accesorios.
              </p>
            </article>
            <article className="carde">
              <p className="card-title">Entretenimiento</p>
              <p className="card-bodyy">
                Libros, videojuegos, películas y música.
              </p>
            </article>
            <article className="cardau">
              <p className="card-title">Vehículos</p>
              <p className="card-bodyy">
                Automóviles, motocicletas, bicicletas y accesorios.
              </p>
            </article>
            <article className="cardhe">
              <p className="card-title">Herramientas y Materiales</p>
              <p className="card-bodyy">
                Herramientas, materiales de construcción y más.
              </p>
            </article>
            <article className="cardsa">
              <p className="card-title">Salud y Belleza</p>
              <p className="card-bodyy">
                Productos de cuidado personal, maquillaje y equipos de
                ejercicio.
              </p>
            </article>
            <article className="cardma">
              <p className="card-title">Mascotas</p>
              <p className="card-bodyy">
                Accesorios para mascotas, alimentos y juguetes.
              </p>
            </article>
            <article className="cardv">
              <p className="card-title">Variedades</p>
              <p className="card-bodyy">
                Una mezcla diversa de artículos únicos y misceláneos.
              </p>
            </article>
          </section>
        </section>

        <section className="testimonials-section">
          <span className="testimonials-section--swapdeal-logo"></span>
          <div className="testimonials-section--title">
            <h2 className="testimonials-section--title-text">
              Comentarios de nuestros usuarios
            </h2>
          </div>

          <section className="testimonials-section--cards">
            <article className="carddd">
              <p className="card-titlee">María López</p>
              <p className="card-bodyy">
                Gracias a Swap Deal, he podido intercambiar mis viejos libros
                por una
                <br /> bicicleta que quería desde hace tiempo. ¡Es una forma
                fantástica de reciclar y obtener lo que necesitas!
              </p>
            </article>
            <article className="carddd">
              <p className="card-titlee">Carlos Gómez</p>
              <p className="card-bodyy">
                Me encanta Swap Deal porque es fácil de usar y me ha permitido
                deshacerme de cosas que ya no usaba. Además, he encontrado
                artículos geniales a cambio. ¡Totalmente recomendado!
              </p>
            </article>
            <article className="carddd">
              <p className="card-titlee">Laura Fernández</p>
              <p className="card-bodyy">
                Nunca pensé que sería tan sencillo intercambiar artículos. La
                comunidad es increíble y siempre hay algo interesante para
                permutar. ¡Swap Deal ha cambiado la manera en que obtengo lo que
                necesito!
              </p>
            </article>
            <article className="carddd">
              <p className="card-titlee">Ana Rodríguez</p>
              <p className="card-bodyy">
                Swap Deal ha sido una revelación para mí. He podido intercambiar
                ropa que ya no usaba por electrodomésticos que necesitaba para
                mi hogar. Es una plataforma increíble que facilita el trueque de
                manera muy sencilla y segura.
              </p>
            </article>
            <article className="carddd">
              <p className="card-titlee">Javier Martínez</p>
              <p className="card-bodyy">
                Nunca pensé que podría encontrar un lugar tan fácil y eficiente
                para intercambiar herramientas y materiales de construcción.
                Swap Deal no solo me ha ayudado a ahorrar dinero, sino que
                también me ha permitido conocer a personas con intereses
                similares. ¡Una experiencia fantástica!
              </p>
            </article>
          </section>
        </section>

        <section className="about-us-section">
          <div className="espa">
            <div className="about-us-section--title">
              <h2 className="about-us-section--title-text">Sobre nosotros</h2>
              <p className="about-us-section--description">
                Swap Deal es la plataforma definitiva para aquellos que buscan
                darle una segunda vida a sus artículos a través de permutas. Nos
                dedicamos a conectar a personas de todo el país para que puedan
                intercambiar sus objetos de manera segura y eficiente. Nuestras
                responsabilidades más relevantes son:
              </p>
              <ul className="about-us-section--list">
                <li>
                  • Facilitamos un espacio donde los usuarios pueden publicar y
                  encontrar artículos para permutar.
                </li>
                <li>
                  • Fomentamos el consumo responsable y la economía circular a
                  través del intercambio de bienes.
                </li>
                <li>
                  • Desarrollamos y mantenemos una plataforma intuitiva y segura
                  para nuestras transacciones.
                </li>
                <li>
                  • Representamos una comunidad inclusiva y amigable que valora
                  el intercambio justo y la reutilización.
                </li>
                <li>
                  • Proveemos soporte y recursos para ayudar a nuestros usuarios
                  a sacar el máximo provecho de sus permutas.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <FooterWavePrincipal />
    </>
  );
}

export default PaginaPrincipal;
