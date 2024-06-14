const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer"); 
const path = require("path");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "swap_deal"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Ruta para obtener todos los usuarios
app.get("/usuario", (req, res) => {
    db.query('SELECT * FROM usuario', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Ruta para obtener un usuario por ID
app.get("/usuario/:documento", (req, res) => {
    const userId = req.params.documento;
    db.query('SELECT * FROM usuario WHERE documento = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    });
});

// Ruta para el inicio de sesión
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error durante el inicio de sesión");
        } else if (result.length > 0) {
            const user = result[0];
            res.send(user);
        } else {
            res.status(401).send({ message: "Credenciales inválidas" });
        }
    });
});

// Ruta para actualizar el perfil del usuario
app.put("/usuario/:documento", (req, res) => {
    const userId = req.params.documento;
    const { nombre, apellido, email, password, reputacion, descripcion } = req.body;
    db.query('UPDATE usuario SET nombre=?, apellido=?, email=?, password=?, reputacion=?, descripcion=? WHERE documento=?',
        [nombre, apellido, email, password, reputacion, descripcion, userId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error updating user profile");
            } else {
                res.send("User profile updated successfully");
            }
        }
    );
});

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'client', 'public', 'assets', 'productos'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten archivos de imagen (jpeg, jpg, png)"));
        }
    }
});


// Ruta para cargar un artículo
app.post("/articulo", upload.single('imagen'), (req, res) => {
    const { titulo, descripcion, tiempo_uso, categoria, id_usuario } = req.body;

    if (!req.file) {
        return res.status(400).send("Imagen es requerida");
    }

    // Ruta relativa para guardar en la base de datos
    const imagen = `/public/assets/productos/${req.file.filename}`;

    const query = 'INSERT INTO articulo (titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error en la consulta de base de datos:", err);
            res.status(500).send("Error al cargar el artículo");
        } else {
            res.send("Artículo cargado exitosamente");
        }
    });
});

// Ruta para obtener los artículos de un usuario específico
app.get("/usuario/:documento/articulos", (req, res) => {
    const userId = req.params.documento;
    db.query('SELECT * FROM articulo WHERE id_usuario = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/usuario/:documento/articulos/:id", (req, res) => {
    const userId = req.params.documento;
    const articuloId = req.params.id;

    // Consulta a la base de datos para obtener el artículo específico por su ID
    db.query('SELECT * FROM articulo WHERE id_usuario = ? AND id = ?', [userId, articuloId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.send(result[0]); // Devuelve el artículo encontrado
        } else {
            res.status(404).send({ message: `Artículo ${articuloId} no encontrado para el usuario ${userId}` });
        }
    });
});

// Servir archivos estáticos de la carpeta public
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3002, () => {
    console.log("corriendo en el puerto 3002");
});