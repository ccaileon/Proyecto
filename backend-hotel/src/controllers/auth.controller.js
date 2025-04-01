const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

const login = (req, res) => {
  const { client_email, password } = req.body;

  console.log("📩 Datos recibidos en el login:", { client_email, password });

  if (!client_email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = `
    SELECT c.client_id, c.client_name, c.client_surname_one, a.account_passwd 
    FROM client c 
    JOIN account a ON c.client_id = a.account_client_id 
    WHERE c.client_email = ?`;

  connection.query(sql, [client_email], async (err, results) => {
    if (err) {
      console.error("❌ Error en la consulta SQL:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      console.warn("⚠️ No se encontró el usuario con el email:", client_email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    console.log("🔍 Datos obtenidos de la base de datos:", user);
    console.log("🔑 Contraseña en texto plano ingresada:", `"${password}"`);
    console.log(
      "🔐 Contraseña encriptada en la base de datos:",
      `"${user.account_passwd}"`
    );

    // **Comparación de la contraseña**
    try {
      const passwordMatch = await bcrypt.compare(password, user.account_passwd);
      console.log("🔍 Resultado de bcrypt.compare():", passwordMatch);

      if (!passwordMatch) {
        console.warn("⚠️ Contraseña incorrecta para el usuario:", client_email);
        return res.status(401).json({ error: "Invalid email or password" });
      }

      console.log("✅ Usuario autenticado correctamente.");

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
    } catch (error) {
      console.error("❌ Error en bcrypt.compare():", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

const employeeLogin = (req, res) => {
  const { emp_email, emp_password } = req.body;

  console.log("📩 Employee login request received:", {
    emp_email,
    emp_password,
  });

  if (!emp_email || !emp_password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = `SELECT emp_id, emp_name, emp_surname_one, emp_password FROM employee WHERE emp_email = ?`;

  connection.query(sql, [emp_email], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const employee = results[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      emp_password,
      employee.emp_password
    );
    console.log("🔍 Password comparison result:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // **Generate JWT token**
    const token = jwt.sign(
      {
        id: employee.emp_id,
        name: employee.emp_name,
        email: emp_email,
      },
      process.env.JWT_SECRET || "claveUltraSecreta", // cambia esto por una variable segura
      { expiresIn: "2h" }
    );

    // **Log the token for debugging purposes**
    res.json({
      message: "Login successful",
      token,
      user: {
        id: employee.emp_id,
        name: employee.emp_name,
        surname: employee.emp_surname_one,
        email: emp_email,
      },
    });
  });
};

module.exports = { login, employeeLogin };
