const Permuta = require("../models/permutaModel");
const Usuario = require("../models/usuarioModel");
const Articulo = require("../models/articuloModel");

exports.createSolicitud = async (req, res, next) => {
  try {
    await Permuta.createSolicitud(req.body);
    res.json({ message: "Solicitud de permuta creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.getSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await Permuta.getSolicitudesByUser(
      req.params.documento
    );
    res.json(solicitudes);
  } catch (error) {
    next(error);
  }
};

exports.aceptarPermuta = async (req, res, next) => {
  try {
    const solicitud = await Permuta.getSolicitudById(req.params.id);
    if (!solicitud) return res.status(404).send("Solicitud no encontrada");

    const {
      id_articulo_solicitado,
      id_articulo_ofrecido,
      id_usuario_solicitante,
      id_usuario_solicitado,
    } = solicitud;

    const [user1, user2] = await Promise.all([
      Usuario.getById(id_usuario_solicitante),
      Usuario.getById(id_usuario_solicitado),
    ]);

    const [art1, art2] = await Promise.all([
      Articulo.getOneWithOwner(id_articulo_solicitado),
      Articulo.getOneWithOwner(id_articulo_ofrecido),
    ]);

    await Promise.all([
      Permuta.updateArticuloOwner(
        id_articulo_solicitado,
        id_usuario_solicitante
      ),
      Permuta.updateArticuloOwner(id_articulo_ofrecido, id_usuario_solicitado),
    ]);

    await Permuta.insertHistorial([
      user1.documento,
      user1.nombre,
      user1.apellido,
      user1.email,
      user1.telefono,
      art1.titulo,
      user2.documento,
      user2.nombre,
      user2.apellido,
      user2.email,
      user2.telefono,
      art2.titulo,
    ]);

    await Permuta.deleteSolicitud(req.params.id);

    res.json({ message: "Permuta aceptada exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.rechazarPermuta = async (req, res, next) => {
  try {
    await Permuta.deleteSolicitud(req.params.id);
    res.json({ message: "Permuta rechazada exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.getHistorial = async (req, res, next) => {
  try {
    const historial = await Permuta.getHistorialByUser(req.params.documento);
    res.json(historial);
  } catch (error) {
    next(error);
  }
};

exports.actualizarValoracion = async (req, res, next) => {
  try {
    const { id_historial, id_usuario, id_usuario1, id_usuario2 } = req.body;
    const columna = id_usuario === id_usuario1 ? "valoracion" : "valoracion2";
    await Permuta.updateValoracion(columna, id_historial, id_usuario);
    res.json({ message: "Valoración actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
};
