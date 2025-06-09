const Articulo = require("../models/articuloModel");

exports.createArticulo = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).send("Imagen requerida");
    const imagen = `/public/assets/productos/${req.file.filename}`;
    const data = { ...req.body, imagen };
    await Articulo.create(data);
    res.json({ message: "Artículo cargado exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.getArticulosByUser = async (req, res, next) => {
  try {
    const articulos = await Articulo.getByUser(req.params.documento);
    res.json(articulos);
  } catch (error) {
    next(error);
  }
};

exports.getArticuloByUserAndId = async (req, res, next) => {
  try {
    const articulo = await Articulo.getByUserAndId(
      req.params.documento,
      req.params.id
    );
    if (articulo) res.json(articulo);
    else res.status(404).json({ message: "Artículo no encontrado" });
  } catch (error) {
    next(error);
  }
};

exports.getArticuloWithOwner = async (req, res, next) => {
  try {
    const articulo = await Articulo.getOneWithOwner(req.params.id);
    if (articulo) res.json(articulo);
    else res.status(404).json({ message: "Artículo no encontrado" });
  } catch (error) {
    next(error);
  }
};

exports.deleteArticulo = async (req, res, next) => {
  try {
    await Articulo.delete(req.params.id);
    res.json({ message: "Artículo eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.getExcludingUser = async (req, res, next) => {
  try {
    const articulos = await Articulo.getExcludingUser(req.params.documento);
    res.json(articulos);
  } catch (error) {
    next(error);
  }
};

exports.getByCategoryExcludingUser = async (req, res, next) => {
  try {
    const categoria = req.params.categoria.replace(/-/g, " ");
    const articulos = await Articulo.getByCategoryExcludingUser(
      categoria,
      req.params.documento
    );
    res.json(articulos);
  } catch (error) {
    next(error);
  }
};

exports.updateArticulo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const imagen = req.file
      ? `/public/assets/productos/${req.file.filename}`
      : req.body.imagen;
    const data = { ...req.body, imagen };
    await Articulo.update(id, data);
    res.json({ message: "Artículo actualizado exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.updateEstado = async (req, res, next) => {
  try {
    await Articulo.updateEstado(req.params.id, req.body.estado);
    res.json({ message: "Estado actualizado exitosamente" });
  } catch (error) {
    next(error);
  }
};
