import axios from "axios";

// Crear una instancia de axios con la URL base
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// === USUARIOS ===
export const login = (data) => API.post("/usuarios/login", data);
export const register = (data) => API.post("/usuarios/register", data);
export const getUsuario = (id) => API.get(`/usuarios/${id}`);
export const updateUsuario = (id, data) =>
  API.put(`/usuarios/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// === ARTÍCULOS ===
export const createArticulo = (data) =>
  API.post("/articulos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getArticulosByUser = (documento) =>
  API.get(`/articulos/usuario/${documento}`);

export const getArticuloById = (id) => API.get(`/articulos/${id}`);

export const getArticulosExcluyendoUser = (documento) =>
  API.get(`/articulos/excluyendo/${documento}`);

export const getArticulosByCategoria = (categoria, documento) =>
  API.get(`/articulos/categoria/${categoria}/excluyendo/${documento}`);

export const updateArticulo = (id, data) =>
  API.put(`/articulos/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateArticuloEstado = (id, estado) =>
  API.put(`/articulos/${id}/estado`, { estado });

export const deleteArticulo = (id) => API.delete(`/articulos/${id}`);

// === PERMUTAS ===
export const crearPermuta = (data) => API.post("/permutas", data);
export const aceptarPermuta = (id) => API.post(`/permutas/${id}/aceptar`);
export const rechazarPermuta = (id) => API.post(`/permutas/${id}/rechazar`);
export const getPermutasUsuario = (documento) =>
  API.get(`/permutas/usuario/${documento}`);

export const getHistorial = (documento) =>
  API.get(`/permutas/historial/${documento}`);

export const actualizarValoracion = (data) =>
  API.post(`/permutas/historial/valoracion`, data);
