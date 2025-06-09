const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { uploadProfile } = require("../middlewares/upload");

router.get("/", usuarioController.getAllUsuarios);
router.get("/:documento", usuarioController.getUsuarioById);
router.post("/login", usuarioController.login);
router.post("/register", usuarioController.register);
router.put(
  "/:documento",
  uploadProfile.single("foto_perfil"),
  usuarioController.updateProfile
);

module.exports = router;
