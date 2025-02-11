const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "aplicacion_hotel",
});

connection.connect((error) => {
  if (error) {
    console.error("❌ Error conectando a MySQL:", error);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

module.exports = connection;
