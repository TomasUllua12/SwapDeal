const db = require("../config/db");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM usuario", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getById = (documento) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM usuario WHERE documento = ?",
      [documento],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      }
    );
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM usuario WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      }
    );
  });
};

exports.register = (data) => {
  const { nombre, apellido, email, password, documento, telefono } = data;

  const fecha_union = new Date();
  const reputacion = 0;
  const descripcion = ""; // valor por defecto
  const imagen = "perfilDefault.jpg"; // asegurate de que exista en tu carpeta de assets

  const query = `INSERT INTO usuario 
    (nombre, apellido, email, password, fecha_union, documento, telefono, reputacion, descripcion, imagen) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        nombre,
        apellido,
        email,
        password,
        fecha_union,
        documento,
        telefono,
        reputacion,
        descripcion,
        imagen,
      ],
      (err, result) => {
        if (err) reject(err);
        else
          resolve({
            nombre,
            apellido,
            email,
            fecha_union,
            documento,
            telefono,
            reputacion,
            descripcion,
            imagen,
          });
      }
    );
  });
};

exports.updateProfile = (documento, data) => {
  const {
    nombre,
    apellido,
    email,
    password,
    telefono,
    reputacion,
    descripcion,
    imagen,
  } = data;
  const query = `UPDATE usuario 
    SET nombre=?, apellido=?, email=?, password=?, telefono=?, reputacion=?, descripcion=?, imagen=? 
    WHERE documento=?`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        nombre,
        apellido,
        email,
        password,
        telefono,
        reputacion,
        descripcion,
        imagen,
        documento,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.getImageById = (documento) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT imagen FROM usuario WHERE documento = ?",
      [documento],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]?.imagen);
      }
    );
  });
};
