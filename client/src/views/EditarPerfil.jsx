import React, { useState, useContext } from "react";
import "./EditarPerfil.css";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";
import { Link } from "react-router-dom";

export function EditarPerfil(props) {
  const { user, setUser } = useContext(UserContext); // Obtén la información del usuario del contexto
  const [nombre, setNombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [telefono, setTelefono] = useState(user.telefono);
  const [reputacion, setReputacion] = useState(user.reputacion);
  const [descripcion, setDescripcion] = useState(user.descripcion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados en la solicitud:", {
        // Agrega este console.log
        nombre,
        apellido,
        email,
        password,
        telefono,
        reputacion,
        descripcion,
        fecha_union: user.fecha_union,
        documento: user.documento,
      });
      const response = await axios.put(
        `http://localhost:3002/usuario/${user.documento}`,
        {
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
          telefono: telefono,
          reputacion: reputacion,
          descripcion: descripcion,
          fecha_union: user.fecha_union, // No estamos modificando la fecha de unión en este formulario
        }
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
        });
        // Actualiza la información del usuario en el contexto
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
          })
        );
        // Actualiza la información del usuario en el localStorage
        alert("Perfil actualizado exitosamente");
      } else {
        alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
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
                maxlength="300"
                className="descripc"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <button type="submit" className="cambiar">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarPerfil;
