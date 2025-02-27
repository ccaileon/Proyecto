const bcrypt = require("bcrypt"); // Importamos bcrypt para hashear la contraseña
const connection = require("../config/db");

const deleteClient = (req, res) => {
  const clientId = req.params.id;

  const sql = " DELETE FROM client WHERE client_id = ?";

  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("❌ Error deleting client:", err);
      return res.status(500).json({ error: "internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.json({ message: "Client successfully deleted" });
  });
};

const updateClient = (req, res) => {
  const clientId = req.params.id;
  const {
    client_doc_type,
    client_doc_id,
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
  } = req.body;

  if (
    !client_doc_type ||
    !client_doc_id ||
    !client_name ||
    !client_surname_one ||
    !client_surname_two ||
    !client_telephone ||
    !client_email
  ) {
    console.log("❌ Faltan datos en la solicitud");
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "UPDATE client SET client_doc_type = ?, client_doc_id = ?, client_name = ?, client_surname_one = ?, client_surname_two = ?, client_telephone = ?, client_email = ? WHERE client_id = ?";
  const values = [
    client_doc_type,
    client_doc_id,
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
    clientId,
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ Error updating client:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.json({ message: "Client successfully updated" });
  });
};

const getClients = (req, res) => {
  connection.query("SELECT * FROM client", (err, results) => {
    if (err) {
      console.error("❌ Error fetching clients:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

const getClientById = (req, res) => {
  const clientId = req.params.id;

  const sql = "SELECT * FROM client WHERE client_id = ?";
  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching client:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Client not found" });
    } else {
      res.json(results[0]);
    }
  });
};

// 🚀 Aquí agregamos el console.log para depurar
const createClient = async (req, res) => {
  console.log("🔍 Datos recibidos en el backend:", req.body);

  const {
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
    password, // <-- Ahora manejamos la contraseña correctamente
  } = req.body;

  if (
    !client_name ||
    !client_surname_one ||
    !client_telephone ||
    !client_email ||
    !password // <-- Validamos que la contraseña se envíe
  ) {
    console.log("❌ Faltan datos obligatorios en la solicitud");
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // **Paso 1: Hashear la contraseña antes de almacenarla**
    const hashedPassword = await bcrypt.hash(password, 10);

    // **Paso 2: Insertar el cliente en la tabla `client`**
    const sqlClient =
      "INSERT INTO client (client_name, client_surname_one, client_surname_two, client_telephone, client_email) VALUES (?, ?, ?, ?, ?)";

    const valuesClient = [
      client_name,
      client_surname_one,
      client_surname_two,
      client_telephone,
      client_email,
    ];

    connection.query(sqlClient, valuesClient, (err, results) => {
      if (err) {
        console.error("❌ Error creando cliente:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const clientId = results.insertId; // Obtenemos el ID del cliente insertado

      // **Paso 3: Insertar la cuenta en la tabla `account`**
      const sqlAccount =
        "INSERT INTO account (account_client_id, account_passwd, account_points) VALUES (?, ?, ?)";

      const valuesAccount = [clientId, hashedPassword, 0]; // Inicializamos puntos en 0

      connection.query(sqlAccount, valuesAccount, (err, results) => {
        if (err) {
          console.error("❌ Error creando cuenta:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "Cliente y cuenta creados con éxito" });
      });
    });
  } catch (error) {
    console.error("❌ Error general en el registro:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
