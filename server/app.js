const express = require("express");
const cors = require("cors");
const path = require("path");

const usuarioRoutes = require("./routes/usuario");
const articuloRoutes = require("./routes/articulo");
const permutaRoutes = require("./routes/permuta");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas estáticas para imágenes
app.use("/public", express.static(path.join(__dirname, "../client/public")));

// Rutas principales
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/articulos", articuloRoutes);
app.use("/api/permutas", permutaRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;
