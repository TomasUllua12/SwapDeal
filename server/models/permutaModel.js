const db = require("../config/db");

exports.createSolicitud = ({
  id_articulo_solicitado,
  id_articulo_ofrecido,
  id_usuario_solicitante,
  id_usuario_solicitado,
}) => {
  const query = `INSERT INTO permuta (id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado) 
                 VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        id_articulo_solicitado,
        id_articulo_ofrecido,
        id_usuario_solicitante,
        id_usuario_solicitado,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.getSolicitudesByUser = (documento) => {
  const query = `SELECT * FROM permuta WHERE id_usuario_solicitante = ? OR id_usuario_solicitado = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [documento, documento], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getSolicitudById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM permuta WHERE id = ?", [id], (err, result) => {
      console.log("Resultado de búsqueda:", result); // 👈
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

exports.deleteSolicitud = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM permuta WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.updateArticuloOwner = (articuloId, nuevoPropietarioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE articulo SET id_usuario = ? WHERE id = ?",
      [nuevoPropietarioId, articuloId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

exports.insertHistorial = (values) => {
  const query = `
    INSERT INTO historial 
    (id_usuario, nombre, apellido, email, telefono, titulo_articulo, 
     id_usuario2, nombre2, apellido2, email2, telefono2, titulo_articulo2) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getHistorialByUser = (documento) => {
  const query = `
    SELECT 
        id_historial, 
        titulo_articulo, 
        titulo_articulo2, 
        id_usuario AS id_usuario1,
        nombre AS nombre_usuario1, 
        apellido AS apellido_usuario1, 
        email AS email_usuario1, 
        telefono AS telefono_usuario1, 
        id_usuario2, 
        nombre2 AS nombre_usuario2, 
        apellido2 AS apellido_usuario2, 
        email2 AS email_usuario2, 
        telefono2 AS telefono_usuario2,
        fecha,
        valoracion,    
        valoracion2    
    FROM historial
    WHERE id_usuario = ? OR id_usuario2 = ?
    ORDER BY fecha DESC`;
  return new Promise((resolve, reject) => {
    db.query(query, [documento, documento], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.updateValoracion = (columna, id_historial, id_usuario, valor) => {
  const query = `UPDATE historial SET ${columna} = ? WHERE id_historial = ? AND (id_usuario = ? OR id_usuario2 = ?)`;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [valor, id_historial, id_usuario, id_usuario],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
