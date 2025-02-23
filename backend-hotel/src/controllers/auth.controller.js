const bcrypt = require("bcrypt");
const connection = require("../config/db");

const login = (req, res) => {
  const { client_email, contraseña } = req.body;

  if (!client_email || !contraseña) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // **Buscar al usuario por correo**
  const sql = `
    SELECT c.client_id, c.client_name, c.client_surname_one, a.account_passwd 
    FROM client c 
    JOIN account a ON c.client_id = a.account_client_id 
    WHERE c.client_email = ?`;

  connection.query(sql, [client_email], async (err, results) => {
    if (err) {
      console.error("❌ Error en la consulta:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // **Verificar la contraseña**
    const passwordMatch = await bcrypt.compare(contraseña, user.account_passwd);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // **Devolver respuesta de éxito**
    res.json({
      message: "Login successful",
      user: {
        id: user.client_id,
        name: user.client_name,
        surname: user.client_surname_one,
        email: client_email,
      },
    });
  });
};

module.exports = { login };
