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

module.exports = { leerPost, escribirPost };
