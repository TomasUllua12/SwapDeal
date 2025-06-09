const express = require("express");
const router = express.Router();
const articuloController = require("../controllers/articuloController");
const { uploadProduct } = require("../middlewares/upload");

router.post(
  "/",
  uploadProduct.single("imagen"),
  articuloController.createArticulo
);
router.get("/usuario/:documento", articuloController.getArticulosByUser);
router.get(
  "/usuario/:documento/:id",
  articuloController.getArticuloByUserAndId
);
router.get("/:id", articuloController.getArticuloWithOwner);
router.delete("/:id", articuloController.deleteArticulo);
router.get("/excluyendo/:documento", articuloController.getExcludingUser);
router.get(
  "/categoria/:categoria/excluyendo/:documento",
  articuloController.getByCategoryExcludingUser
);
router.put(
  "/:id",
  uploadProduct.single("imagen"),
  articuloController.updateArticulo
);
router.put("/:id/estado", articuloController.updateEstado);

module.exports = router;
