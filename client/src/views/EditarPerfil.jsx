import React, { useState, useContext } from "react";
import "./EditarPerfil.css";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EditarPerfil(props) {
  const { user, setUser } = useContext(UserContext); // Obtén la información del usuario del contexto
  const [nombre, setNombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [telefono, setTelefono] = useState(user.telefono);
  const [reputacion, setReputacion] = useState(user.reputacion);
  const [descripcion, setDescripcion] = useState(user.descripcion);
  const [fotoPerfil, setFotoPerfil] = useState(null); // Nuevo estado para la foto de perfil

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telefono', telefono);
    formData.append('reputacion', reputacion);
    formData.append('descripcion', descripcion);
    if (fotoPerfil) {
      formData.append('foto_perfil', fotoPerfil); // Añadir la foto de perfil al formulario
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/usuario/${user.documento}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data) {
        setUser({
          ...user,
          nombre,
          apellido,
          email,
          password,
          telefono,
          reputacion,
          descripcion,
          foto_perfil: fotoPerfil ? URL.createObjectURL(fotoPerfil) : user.foto_perfil, // Actualizar la ruta de la foto de perfil
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            nombre,
            apellido,
            email,
            password,
            telefono,
            reputacion,
            descripcion,
            foto_perfil: fotoPerfil ? URL.createObjectURL(fotoPerfil) : user.foto_perfil, // Actualizar la ruta de la foto de perfil en el localStorage
          })
        );
        toast.success("Perfil actualizado exitosamente");
      } else {
        toast.error("Error al actualizar el perfil");
      }
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
            <a href="" className="volver">
              Volver al perfil
            </a>
          </Link>

          <form className="form" onSubmit={handleSubmit}>
            <div className="formas">
              <label>Nombre:</label>
              <input
                type="text"
                className="nombr"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="formas">
              <label>Apellido:</label>
              <input
                type="text"
                className="apelli"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>

            <div className="formas">
              <label>Email:</label>
              <input
                type="email"
                className="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formas">
              <label>Contraseña:</label>
              <input
                type="password"
                className="contra"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="formas">
              <label>Telefono:</label>
              <input
                type="text"
                className="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="formas">
              <label>Descripción:</label>
              <textarea
                rows="8"
                cols="51"
                maxLength="300"
                className="descripc"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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