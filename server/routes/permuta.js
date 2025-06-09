const express = require("express");
const router = express.Router();
const permutaController = require("../controllers/permutaController");

router.post("/", permutaController.createSolicitud);
router.post("/:id/aceptar", permutaController.aceptarPermuta);
router.post("/:id/rechazar", permutaController.rechazarPermuta);
router.get("/historial/:documento", permutaController.getHistorial);
router.post("/historial/valoracion", permutaController.actualizarValoracion);
router.get("/usuario/:documento", permutaController.getSolicitudes);
module.exports = router;
