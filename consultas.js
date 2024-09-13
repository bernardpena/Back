const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "likeme",
  allowExitonIdle: true,
});

/* leer */
const leerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts;");
  console.log("registros de la BD: ", rows);
  return rows;
};

/* escribir */
const escribirPost = async (titulo, url, descripcion) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)";
  const values = [titulo, url, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Post Agregado", result);
};

/* Actualizar */
const actualizarPost = async (id, titulo, url, descripcion) => {
  const consulta =
    "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *"; 
  const values = [titulo, url, descripcion, id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw new Error("Post no encontrado");
  }
  return result.rows[0];
};

/* Eliminar */
const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
      throw new Error("Post no encontrado");
  }
  console.log("Post eliminado", result.rows[0]);
  return result.rows[0];
};

module.exports = { leerPost, escribirPost, actualizarPost, eliminarPost };
