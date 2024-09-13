const { leerPost, escribirPost, actualizarPost, eliminarPost } = require("./consultas");
const express = require("express"); //importamos express
const cors = require("cors"); //importamos cors
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express(); //instanciamos express
app.use(bodyParser.json());
app.use(cors()); //activamos cors
const port = 3000; //definimos puerto 3000

//middleware para recibir desde el front (los objetos "JSON")
app.use(express.json());
app.use(cors());

/* servidor escuchando */
app.listen(port, () => console.log("Servidor escuchando en puerto 3000"));

/* Leer */
app.get("/posts", async (req, res) => {
  try {
    const posts = await leerPost();
    res.json(posts);
  } catch (error) {
    console.error("Error al leer los posts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/* Escribir */
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  try {
    await escribirPost(titulo, url, descripcion);
    res.status(201).json({ message: "Post creado" });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/* Actualizar */
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, url, descripcion } = req.body;

  try {
    const updatedPost = await actualizarPost(id, titulo, url, descripcion);
    res.json(updatedPost); 
  } catch (error) {
    res.status(error.message === "Post no encontrado" ? 404 : 500).json({ error: error.message });
  }
});

/* Eliminar */
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedPost = await eliminarPost(id); 
    res.json({ message: "Post eliminado", post: deletedPost });
  } catch (error) {
    res.status(error.message === "Post no encontrado" ? 404 : 500).json({ error: error.message });
  }
});

