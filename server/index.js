const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Ruta para obtener un usuario por ID
app.get("/usuarios/:id", (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [userId], (err, result) => {
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


app.listen(3002, () => {
    console.log("corriendo en el puerto 3002");
});