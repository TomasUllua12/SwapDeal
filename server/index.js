const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "swap_deal"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Ruta para obtener todos los usuario
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
    //const userId = req.params.documento;
    const { nombre, apellido, email, password, reputacion, descripcion, userId } = req.body;
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

app.listen(3002, () => {
    console.log("corriendo en el puerto 3002");
});