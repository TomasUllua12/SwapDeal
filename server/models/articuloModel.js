const db = require("../config/db");

exports.create = (data) => {
  const { titulo, descripcion, tiempo_uso, categoria, id_usuario, imagen } =
    data;
  const query = `INSERT INTO articulo 
    (titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.getByUser = (documento) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM articulo WHERE id_usuario = ?",
      [documento],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.getByUserAndId = (documento, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM articulo WHERE id_usuario = ? AND id = ?",
      [documento, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      }
    );
  });
};

exports.getOneWithOwner = (id) => {
  const query = `
    SELECT articulo.*, 
           usuario.nombre AS nombre_propietario, 
           usuario.apellido AS apellido_propietario, 
           usuario.email AS correo_propietario, 
           usuario.reputacion AS reputacion_propietario 
    FROM articulo 
    JOIN usuario ON articulo.id_usuario = usuario.documento 
    WHERE articulo.id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM articulo WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getExcludingUser = (documento) => {
  const query =
    'SELECT * FROM articulo WHERE id_usuario != ? AND estado != "oculto"';
  return new Promise((resolve, reject) => {
    db.query(query, [documento], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getByCategoryExcludingUser = (categoria, documento) => {
  const query =
    'SELECT * FROM articulo WHERE categoria = ? AND id_usuario != ? AND estado != "oculto"';
  return new Promise((resolve, reject) => {
    db.query(query, [categoria, documento], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.update = (id, data) => {
  const { titulo, descripcion, tiempo_uso, categoria, imagen } = data;
  const query = `UPDATE articulo SET titulo=?, descripcion=?, tiempo_uso=?, categoria=?, imagen=? WHERE id=?`;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [titulo, descripcion, tiempo_uso, categoria, imagen, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.updateEstado = (id, estado) => {
  const query = `UPDATE articulo SET estado=? WHERE id=?`;
  return new Promise((resolve, reject) => {
    db.query(query, [estado, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
