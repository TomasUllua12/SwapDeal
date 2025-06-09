const Usuario = require("../models/usuarioModel");

exports.getAllUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

exports.getUsuarioById = async (req, res, next) => {
  try {
    const usuario = await Usuario.getById(req.params.documento);
    if (usuario) res.json(usuario);
    else res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.login(email, password);
    if (user) res.json(user);
    else res.status(401).json({ message: "Credenciales inválidas" });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, documento, telefono } = req.body;

    if (!nombre || nombre.length < 2) {
      return res
        .status(400)
        .json({ message: "El nombre debe tener al menos 2 caracteres." });
    }

    if (!apellido || apellido.length < 2) {
      return res
        .status(400)
        .json({ message: "El apellido debe tener al menos 2 caracteres." });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "El email no es válido." });
    }

    if (!password || password.length < 4) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 4 caracteres." });
    }

    if (!documento || isNaN(documento) || documento.length < 7) {
      return res.status(400).json({
        message: "El documento debe ser numérico y tener al menos 7 dígitos.",
      });
    }

    if (!telefono || isNaN(telefono) || telefono.length < 6) {
      return res.status(400).json({
        message: "El teléfono debe ser numérico y tener al menos 6 dígitos.",
      });
    }

    const newUser = await Usuario.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: `Error al registrar: ${error.message}` });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const documento = req.params.documento;
    let imagen = req.file ? `/assets/fotosPerfil/${req.file.filename}` : null;

    if (!imagen) {
      imagen = await Usuario.getImageById(documento);
    }

    const datos = { ...req.body, imagen };
    await Usuario.updateProfile(documento, datos);
    res.json({ message: "Perfil actualizado con éxito" });
  } catch (error) {
    next(error);
  }
};
