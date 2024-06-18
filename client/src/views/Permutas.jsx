import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Header } from "../components/Header";
import FooterWave from "../components/Footers/FooterWave";
import Solicitud from "../components/Permutas/Solicitud";
import PermutaCompletada  from "../components/Permutas/PermutaCompletada";
import "./Permutas.css";

function Permutas() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch(`http://localhost:3002/solicitudesPermuta/${user.documento}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error fetching swap requests:', error);
      }
    };

    fetchSolicitudes();
  }, [user.documento]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(`http://localhost:3002/historialPermutas/${user.documento}`);
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error('Error fetching historial:', error);
      }
    };

    fetchHistorial();
  }, [user.documento]);

  const handleAceptar = async (idSolicitud) => {
    try {
      const response = await fetch(`http://localhost:3002/solicitudPermuta/${idSolicitud}/aceptar`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== idSolicitud));
    } catch (error) {
      console.error('Error accepting swap request:', error);
    }
  };

  const handleRechazar = async (idSolicitud) => {
    try {
      const response = await fetch(`http://localhost:3002/solicitudPermuta/${idSolicitud}/rechazar`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== idSolicitud));
    } catch (error) {
      console.error('Error rejecting swap request:', error);
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
        <h2 className="main-permutas-solicitudes-title">Solicitudes de Permuta</h2>
        <section className="main-permutas-solicitudes">
          <div className="main-permutas-solicitudes__container">
            {solicitudes.length === 0 ? (
              <p className="per">No tienes solicitudes de permuta.</p>
            ) : (
              solicitudes.map(solicitud => (
                <Solicitud
                  key={solicitud.id}
                  solicitud={solicitud}
                  onAceptar={handleAceptar}
                  onRechazar={handleRechazar}
                  userId={user.documento}
                />
              ))
            )}
          </div>
        </section>
        <h2 className="main-permutas-historial-title">Historial de Permutas</h2>
        <section className="main-permutas-historial">
          <div className="main-permutas-historial__container">
            {historial.length === 0 ? (
              <p>No hay permutas completadas.</p>
            ) : (
              historial.map(permuta => (
                <PermutaCompletada key={permuta.id} permuta={permuta} />
              ))
            )}
          </div>
        </section>
      </main>
      <FooterWave />
    </>
  );
}

export default Permutas;