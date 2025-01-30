const db = require("./db");

async function testConnection() {
  try {
    const [rows] = await db.query(
      "SELECT '✅ Conexión exitosa con MySQL' AS message"
    );
    console.log(rows[0].message);
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error);
  }
}

testConnection();
