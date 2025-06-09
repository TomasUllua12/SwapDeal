import "./BotonLogin.css";
import { Link } from "react-router-dom";

function BotonLogin() {
  return (
    <>
      <Link className="header--button" to={"/Login"}>
        Comienza aquí ahora
      </Link>
    </>
  );
}

export default BotonLogin;
