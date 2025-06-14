/*const express = require("express");
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





// Configuración de almacenamiento para Multer
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../client/public/assets/fotosPerfil'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const uploadd = multer({ 
    storage: storageConfig,  // Corrección aquí
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

// Ruta para actualizar el perfil del usuario
app.put("/usuario/:documento", uploadd.single('foto_perfil'), (req, res) => {  
    const userId = req.params.documento;
    const { nombre, apellido, email, password, telefono, reputacion, descripcion } = req.body;
    let fotoPerfil = null;

    // Consultar la imagen existente si no se ha cargado una nueva
    if (!req.file) {
        db.query('SELECT imagen FROM usuario WHERE documento = ?', [userId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error fetching user profile image");
            }
            fotoPerfil = results[0].imagen;

            db.query(
                'UPDATE usuario SET nombre=?, apellido=?, email=?, password=?, telefono=?, reputacion=?, descripcion=?, imagen=? WHERE documento=?',
                [nombre, apellido, email, password, telefono, reputacion, descripcion, fotoPerfil, userId],
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
    } else {
        fotoPerfil = `/assets/fotosPerfil/${req.file.filename}`;
        db.query(
            'UPDATE usuario SET nombre=?, apellido=?, email=?, password=?, telefono=?, reputacion=?, descripcion=?, imagen=? WHERE documento=?',
            [nombre, apellido, email, password, telefono, reputacion, descripcion, fotoPerfil, userId],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error updating user profile");
                } else {
                    res.send("User profile updated successfully");
                }
            }
        );
    }
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
    const imagen = `/public/assets/productos/${req.file.filename}`;
    const query = 'INSERT INTO articulo (titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [titulo, descripcion, imagen, tiempo_uso, categoria, id_usuario];
    console.log("Datos recibidos para el artículo:", values); // Logging adicional
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
app.get("/usuario/:documento/articulo", (req, res) => {
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


app.get("/usuario/:documento/articulo/:id", (req, res) => {
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


// Ruta para eliminar un artículo
app.delete("/articulo/:id", (req, res) => {
    const articuloId = req.params.id;
    db.query('DELETE FROM articulo WHERE id = ?', [articuloId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al eliminar el artículo");
        } else {
            res.send("Artículo eliminado exitosamente");
        }
    });
});


// Ruta para obtener todos los artículos excepto los del usuario logueado y los ocultos
app.get("/articulos/excluyendo/:documento", (req, res) => {
    const userId = req.params.documento;
    const query = 'SELECT * FROM articulo WHERE id_usuario != ? AND estado != "oculto"';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Ruta para obtener un artículo por su ID con la información del propietario
app.get("/articulo/:id", (req, res) => {
    const articuloId = req.params.id;
    const query = `
        SELECT 
            articulo.*, 
            usuario.nombre AS nombre_propietario, 
            usuario.apellido AS apellido_propietario, 
            usuario.email AS correo_propietario, 
            usuario.reputacion AS reputacion_propietario 
        FROM articulo 
        JOIN usuario ON articulo.id_usuario = usuario.documento 
        WHERE articulo.id = ?`;

    db.query(query, [articuloId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send({ message: `Artículo ${articuloId} no encontrado` });
        }
    });
});

// Ruta para obtener los artículos de una categoría específica excepto los del usuario logueado y los ocultos
app.get("/articulos/categoria/:categoria/excluyendo/:documento", (req, res) => {
    const { categoria, documento } = req.params;
    const formattedCategoria = categoria.replace(/-/g, ' '); // Reemplaza guiones con espacios

    const query = 'SELECT * FROM articulo WHERE categoria = ? AND id_usuario != ? AND estado != "oculto"';
    db.query(query, [formattedCategoria, documento], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Ruta para crear una solicitud de permuta
app.post("/solicitudPermuta", (req, res) => {
    const { id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado } = req.body;
    const query = 'INSERT INTO permuta (id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado) VALUES (?, ?, ?, ?)';
    const values = [id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al crear la solicitud de permuta");
        } else {
            res.send("Solicitud de permuta creada exitosamente");
        }
    });
});


// Agrega esta ruta a tu backend para manejar la obtención de solicitudes de permuta
app.get("/solicitudesPermuta/:documento", (req, res) => {
    const userId = req.params.documento;
    const query = 'SELECT * FROM permuta WHERE id_usuario_solicitante = ? OR id_usuario_solicitado = ?';
    db.query(query, [userId, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las solicitudes de permuta");
        } else {
            res.send(result);
        }
    });
});


// Ruta para actualizar un artículo
app.put("/articulo/:id", upload.single('imagen'), (req, res) => {
    const articuloId = req.params.id;
    const { titulo, descripcion, tiempo_uso, categoria, id_usuario, imagen: existingImagen } = req.body;
    let imagen = existingImagen; // Imagen existente por defecto

    // Si se subió una nueva imagen, actualizamos el valor de imagen
    if (req.file) {
        imagen = `/public/assets/productos/${req.file.filename}`;
    }

    const query = 'UPDATE articulo SET titulo=?, descripcion=?, tiempo_uso=?, categoria=?, imagen=? WHERE id=?';
    const values = [titulo, descripcion, tiempo_uso, categoria, imagen, articuloId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al actualizar el artículo");
        } else {
            res.send("Artículo actualizado exitosamente");
        }
    });
});


// Ruta para obtener un artículo por su ID con la información del propietario
app.get("/articulo/:id", (req, res) => {
    const articuloId = req.params.id;
    const query = `
        SELECT 
            articulo.*, 
            usuario.nombre AS nombre_propietario, 
            usuario.apellido AS apellido_propietario, 
            usuario.email AS correo_propietario, 
            usuario.reputacion AS reputacion_propietario 
        FROM articulo 
        JOIN usuario ON articulo.id_usuario = usuario.documento 
        WHERE articulo.id = ?`;

    db.query(query, [articuloId], (err, results) => {
        if (err) {
            console.error('Error al obtener el artículo:', err);
            res.status(500).json({ error: 'Error al obtener el artículo' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Artículo no encontrado' });
            }
        }
    });
});



// Ruta para aceptar una solicitud de permuta
app.post("/solicitudPermuta/:id/aceptar", async (req, res) => {
    const idSolicitud = req.params.id;
    const query = 'SELECT * FROM permuta WHERE id = ?';
    db.query(query, [idSolicitud], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al buscar la solicitud de permuta");
            return;
        }

        if (result.length === 0) {
            res.status(404).send("Solicitud de permuta no encontrada");
            return;
        }

        const { id_articulo_solicitado, id_articulo_ofrecido, id_usuario_solicitante, id_usuario_solicitado } = result[0];

        try {
            // Obtener información del usuario solicitante y solicitado
            const [userData1, userData2] = await Promise.all([
                getUserData(id_usuario_solicitante),
                getUserData(id_usuario_solicitado)
            ]);

            // Obtener información de los artículos solicitado y ofrecido
            const [articuloData1, articuloData2] = await Promise.all([
                getArticuloData(id_articulo_solicitado),
                getArticuloData(id_articulo_ofrecido)
            ]);

            // Actualizar los artículos cambiando el id_usuario
            await Promise.all([
                updateArticuloOwner(id_articulo_solicitado,  id_usuario_solicitante),
                updateArticuloOwner(id_articulo_ofrecido, id_usuario_solicitado)
            ]);

            // Insertar en la tabla historial
            const queryInsert = `
                INSERT INTO historial 
                (id_usuario, nombre, apellido, email, telefono, titulo_articulo, 
                id_usuario2, nombre2, apellido2, email2, telefono2, titulo_articulo2) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                userData1.documento, userData1.nombre, userData1.apellido, userData1.email, userData1.telefono, articuloData1.titulo,
                userData2.documento, userData2.nombre, userData2.apellido, userData2.email, userData2.telefono, articuloData2.titulo
            ];

            db.query(queryInsert, values, (err, resultInsert) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error al insertar en la tabla historial");
                } else {
                    // Eliminar la solicitud de permuta
                    const queryDelete = 'DELETE FROM permuta WHERE id = ?';
                    db.query(queryDelete, [idSolicitud], (err, resultDelete) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Error al eliminar la solicitud de permuta");
                        } else {
                            res.send("Permuta aceptada exitosamente");
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error accepting swap request:', error);
            res.status(500).send("Error al aceptar la solicitud de permuta");
        }
    });
});

// Función para actualizar el propietario de un artículo
function updateArticuloOwner(articuloId, nuevoPropietarioId) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE articulo SET id_usuario = ? WHERE id = ?', [nuevoPropietarioId, articuloId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Ruta para rechazar una solicitud de permuta
app.post("/solicitudPermuta/:id/rechazar", (req, res) => {
    const idSolicitud = req.params.id;
    const query = 'DELETE FROM permuta WHERE id = ?';
    db.query(query, [idSolicitud], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al eliminar la solicitud de permuta");
        } else {
            res.send("Solicitud de permuta rechazada exitosamente");
        }
    });
});

// Función auxiliar para obtener datos del usuario y su artículo
async function getUserDataAndArticulo(userId, articuloId) {
    const [userData, articuloData] = await Promise.all([
        getUserData(userId),
        getArticuloData(articuloId)
    ]);
    return { ...userData, ...articuloData };
}

// Función auxiliar para obtener datos del usuario
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE documento = ?', [userId], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length > 0) {
                resolve(result[0]);
            } else {
                reject(new Error(`Usuario con documento ${userId} no encontrado`));
            }
        });
    });
}

// Función auxiliar para obtener datos del artículo
function getArticuloData(articuloId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM articulo WHERE id = ?', [articuloId], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length > 0) {
                resolve(result[0]);
            } else {
                reject(new Error(`Artículo con ID ${articuloId} no encontrado`));
            }
        });
    });
}



// Ruta para guardar en el historial
app.get("/historialPermutas/:documento", (req, res) => {
    const userId = req.params.documento;
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
        ORDER BY fecha DESC;  -- Ordenar por fecha en orden descendente
    `;

    db.query(query, [userId, userId], (err, result) => {
        if (err) {
            console.error('Error al obtener el historial de permutas:', err);
            res.status(500).send("Error al obtener el historial de permutas");
        } else {
            res.send(result);
        }
    });
});


// Ruta para actualizar la valoración de un usuario en una permuta específica
app.post("/actualizarValoracion", (req, res) => {
    const { id_historial, id_usuario, id_usuario1, id_usuario2, nuevaValoracion } = req.body;

    // Determinar qué columna actualizar basada en el ID del usuario
    const columnaValoracion = id_usuario === id_usuario1 ? 'valoracion' : 'valoracion2';

    const query = `
        UPDATE historial
        SET ${columnaValoracion} = ?
        WHERE id_historial = ? AND (id_usuario = ? OR id_usuario2 = ?)
    `;

    db.query(query, [nuevaValoracion, id_historial, id_usuario, id_usuario], (err, result) => {
        if (err) {
            console.error('Error al actualizar la valoración:', err);
            res.status(500).json({ error: "Error al actualizar la valoración" });
        } else {
            res.json({ message: "Valoración actualizada exitosamente" });
        }
    });
});


// Ruta para registrar un nuevo usuario
app.post("/register", (req, res) => {
    const { nombre, apellido, email, password, documento, telefono } = req.body;
    const fecha_union = new Date();
    const query = 'INSERT INTO usuario (nombre, apellido, email, password, fecha_union, documento, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido, email, password, fecha_union, documento, telefono];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            res.status(500).send(`Error al registrar el usuario: ${err.message}`);
        } else {
            // Devolver los datos del usuario recién registrado
            const newUser = { nombre, apellido, email, fecha_union, documento, telefono };
            res.status(201).json(newUser);
        }
    });
});


// Ruta para actualizar el estado de un artículo
app.put("/articulo/:id/estado", (req, res) => {
    const articuloId = req.params.id;
    const { estado } = req.body; // El nuevo estado (publicado/oculto)

    const query = 'UPDATE articulo SET estado=? WHERE id=?';
    const values = [estado, articuloId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el estado del artículo:', err);
            res.status(500).send("Error al actualizar el estado del artículo");
        } else {
            res.send("Estado del artículo actualizado exitosamente");
        }
    });
});





// Servir archivos estáticos de la carpeta public
app.use('/public', express.static(path.join(__dirname, '..', 'client', 'public')));

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


app.listen(3002, () => {
    console.log("corriendo en el puerto 3002");
});

*/
