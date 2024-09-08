const { leerPost, escribirPost } = require("./consultas");
const express = require("express"); //importamos express
const cors = require("cors"); //importamos cors
const fs = require("fs");

const app = express(); //instanciamos express
const port = 3000; //definimos puerto 3000

//middleware para recibir desde el front (los objetos "JSON")
app.use(express.json());
app.use(cors());

/* servidor escuchando */
app.listen(port, () => console.log("Servidor escuchando en puerto 3000"));

/* Leer */
app.get("/posts", async (req, res) => {
  const obtenerPost = await leerPost();
  res.json(obtenerPost);
});

/* Escribir */
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await escribirPost(titulo, url, descripcion);
  res.send("El post fue Agregado");
});
