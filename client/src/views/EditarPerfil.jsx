import { useState } from "react";
import "./EditarPerfil.css";
import useAuth from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updateUsuario } from "../services/api";
import "react-toastify/dist/ReactToastify.css";

/* ──────────────────
   Reglas de validación (idénticas a Register, sin documento)
────────────────── */
const editRules = [
  {
    field: "nombre",
    test: (v) => v.trim().length >= 2,
    msg: "El nombre debe tener al menos 2 caracteres.",
  },
  {
    field: "apellido",
    test: (v) => v.trim().length >= 2,
    msg: "El apellido debe tener al menos 2 caracteres.",
  },
  {
    field: "email",
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    msg: "El email no es válido.",
  },
  {
    field: "password",
    test: (v) => v.length >= 4,
    msg: "La contraseña debe tener al menos 4 caracteres.",
  },
  {
    field: "telefono",
    test: (v) => /^\d{6,}$/.test(v),
    msg: "El teléfono debe ser numérico y tener al menos 6 dígitos.",
  },
];

export function EditarPerfil() {
  const { usuario, loginUser } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellido, setApellido] = useState(usuario.apellido);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.password);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [reputacion] = useState(usuario.reputacion); // solo lectura
  const [descripcion, setDescripcion] = useState(usuario.descripcion || "");
  const [fotoPerfil, setFotoPerfil] = useState(null);

  /* helper: limpia el validity y actualiza el state */
  const handleChange = (setter) => (e) => {
    e.target.setCustomValidity("");
    setter(e.target.value);
  };

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    /* ─── Validaciones mínimas ─── */
    const values = { nombre, apellido, email, password, telefono };
    for (const { field, test, msg } of editRules) {
      if (!test(values[field])) {
        form[field].setCustomValidity(msg);
        form[field].reportValidity();
        return;
      }
    }

    /* si pasa validación, enviar */
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("telefono", telefono);
    formData.append("reputacion", reputacion);
    formData.append("descripcion", descripcion);
    if (fotoPerfil) formData.append("foto_perfil", fotoPerfil);

    try {
      await updateUsuario(usuario.documento, formData);

      /* actualiza contexto + storage */
      loginUser({
        ...usuario,
        nombre,
        apellido,
        email,
        password,
        telefono,
        reputacion,
        descripcion,
        imagen: fotoPerfil
          ? `/public/assets/fotosPerfil/${fotoPerfil.name}`
          : usuario.imagen,
      });

      toast.success("Perfil actualizado exitosamente");
      setTimeout(() => navigate("/Perfil"), 1000);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  return (
    <>
      <div className="editarPerfil-background"></div>
      <div className="editarPerfil-wrapper"></div>
      <div className="container-editarPerfil">
        <div className="caja-info">
          <p className="editar">Editar Perfil</p>
          <Link to="/Perfil">
            <span className="volver">Volver al perfil</span>
          </Link>

          <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <div className="formas">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                className="nombr"
                required
                value={nombre}
                onChange={handleChange(setNombre)}
              />
            </div>

            <div className="formas">
              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                className="apelli"
                required
                value={apellido}
                onChange={handleChange(setApellido)}
              />
            </div>

            <div className="formas">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="mail"
                required
                value={email}
                onChange={handleChange(setEmail)}
              />
            </div>

            <div className="formas">
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                className="contra"
                required
                value={password}
                onChange={handleChange(setPassword)}
              />
            </div>

            <div className="formas">
              <label>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                className="telefono"
                required
                value={telefono}
                onChange={handleChange(setTelefono)}
              />
            </div>

            <div className="formas">
              <label>Descripción:</label>
              <textarea
                rows="8"
                cols="51"
                maxLength="300"
                className="descripc"
                name="descripcion"
                value={descripcion}
                onChange={handleChange(setDescripcion)}
              />
            </div>

            <div className="formas">
              <label>Foto de Perfil:</label>
              <input
                type="file"
                className="foto_perfil"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="cambiar">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditarPerfil;
