import { useState, useEffect } from "react";
import useAuth from "../context/useAuth";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import Solicitud from "../components/Permutas/Solicitud";
import PermutaCompletada from "../components/Permutas/PermutaCompleta";
import {
  getPermutasUsuario,
  getHistorial,
} from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Permutas.css";

function Permutas() {
  const { usuario } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    const fetchSolicitudes = async () => {
      try {
        const res = await getPermutasUsuario(usuario.documento);
        setSolicitudes(res.data);
      } catch (error) {
        console.error("Error al obtener solicitudes de permuta:", error);
      }
    };

    fetchSolicitudes();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;

    const fetchHistorial = async () => {
      try {
        const res = await getHistorial(usuario.documento);
        setHistorial(res.data);
      } catch (error) {
        console.error("Error al obtener historial de permutas:", error);
      }
    };

    fetchHistorial();
  }, [usuario]);

  const actualizarHistorial = async () => {
    try {
      const res = await getHistorial(usuario.documento);
      setHistorial(res.data);
    } catch (error) {
      console.error("Error al actualizar historial:", error);
    }
  };

  const handleAceptar = async (idSolicitud) => {
    try {
      setSolicitudes((prev) => prev.filter((s) => s.id !== idSolicitud));
      await actualizarHistorial();
      toast.success("Permuta aceptada con éxito");
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
      toast.error("Hubo un error al aceptar la permuta");
    }
  };

  const handleRechazar = async (idSolicitud) => {
    try {
      setSolicitudes((prev) => prev.filter((s) => s.id !== idSolicitud));
      toast.success("Permuta rechazada con éxito");
    } catch (error) {
      console.error("Error al rechazar la permuta:", error);
      toast.error("Hubo un error al rechazar la permuta");
    }
  };

  return (
    <>
      <section className="main-permutas-banner">
        <div className="main-permutas-banner__image">
          <Header />
          <h2 className="permutas-title">Permutas</h2>
        </div>
      </section>
      <main className="main-permutas">
        <h2 className="main-permutas-solicitudes-title">
          Solicitudes de Permuta
        </h2>
        <section className="main-permutas-solicitudes">
          <div className="main-permutas-solicitudes__container">
            {solicitudes.length === 0 ? (
              <p className="per">No tienes solicitudes de permuta</p>
            ) : (
              solicitudes.map((solicitud) => (
                <Solicitud
                  key={solicitud.id}
                  solicitud={solicitud}
                  onAceptar={handleAceptar}
                  onRechazar={handleRechazar}
                  userId={usuario.documento}
                />
              ))
            )}
          </div>
        </section>

        <h2 className="main-permutas-historial-title">Historial de Permutas</h2>
        <section className="main-permutas-historial">
          <div className="main-permutas-historial__container">
            {historial.length === 0 ? (
              <p className="his">No hay permutas completadas</p>
            ) : (
              historial.map((permuta) => (
                <PermutaCompletada
                  key={permuta.id_historial}
                  permuta={permuta}
                />
              ))
            )}
          </div>
        </section>
      </main>
      <FooterWave />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default Permutas;
