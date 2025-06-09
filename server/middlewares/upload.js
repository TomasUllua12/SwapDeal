const multer = require("multer");
const path = require("path");

// Configuración para perfil
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/assets/fotosPerfil"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuración para artículos
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/assets/productos"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const valid =
    allowed.test(file.mimetype) &&
    allowed.test(path.extname(file.originalname).toLowerCase());
  if (valid) cb(null, true);
  else cb(new Error("Solo se permiten archivos de imagen (jpeg, jpg, png)"));
};

const uploadProfile = multer({ storage: profileStorage, fileFilter });
const uploadProduct = multer({ storage: productStorage, fileFilter });

module.exports = {
  uploadProfile,
  uploadProduct,
};
