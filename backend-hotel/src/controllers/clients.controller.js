const bcrypt = require("bcrypt"); // Importamos bcrypt para hashear la contraseña
const connection = require("../config/db");

const deleteClient = (req, res) => {
  const clientId = req.params.id;

  // Paso 1: Borrar cuenta asociada al cliente
  const deleteAccountSQL = "DELETE FROM account WHERE account_client_id = ?";
  connection.query(deleteAccountSQL, [clientId], (err) => {
    if (err) {
      console.error("Error deleting account:", err);
      return res.status(500).json({ error: "Error deleting account" });
    }

    // Paso 2: Borrar cliente
    const deleteClientSQL = "DELETE FROM client WHERE client_id = ?";
    connection.query(deleteClientSQL, [clientId], (err, results) => {
      if (err) {
        console.error("Error deleting client:", err);
        return res.status(500).json({ error: "Error deleting client" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json({ message: "Client and account successfully deleted" });
    });
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

  // Validar al menos un campo para actualizar
  if (
    !client_doc_type &&
    !client_doc_id &&
    !client_name &&
    !client_surname_one &&
    !client_surname_two &&
    !client_telephone &&
    !client_email
  ) {
    return res.status(400).json({ error: "No hay datos para actualizar" });
  }

  let fields = [];
  let values = [];

  if (client_doc_type !== undefined) {
    fields.push("client_doc_type = ?");
    values.push(client_doc_type);
  }
  if (client_doc_id !== undefined) {
    fields.push("client_doc_id = ?");
    values.push(client_doc_id);
  }
  if (client_name !== undefined) {
    fields.push("client_name = ?");
    values.push(client_name);
  }
  if (client_surname_one !== undefined) {
    fields.push("client_surname_one = ?");
    values.push(client_surname_one);
  }
  if (client_surname_two !== undefined) {
    fields.push("client_surname_two = ?");
    values.push(client_surname_two);
  }
  if (client_telephone !== undefined) {
    fields.push("client_telephone = ?");
    values.push(client_telephone);
  }
  if (client_email !== undefined) {
    fields.push("client_email = ?");
    values.push(client_email);
  }

  const sql = `UPDATE client SET ${fields.join(", ")} WHERE client_id = ?`;
  values.push(clientId);

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating client:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.json({ message: "Cliente actualizado correctamente" });
  });
};

const getClients = (req, res) => {
  connection.query("SELECT * FROM client", (err, results) => {
    if (err) {
      console.error("Error fetching clients:", err);
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
      console.error("Error fetching client:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Client not found" });
    } else {
      res.json(results[0]);
    }
  });
};

// **Crear un nuevo cliente y su cuenta asociada**
const createClient = async (req, res) => {
  //console.log("Datos recibidos en el backend:", req.body);

  const {
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
    password,
  } = req.body;

  if (
    !client_name ||
    !client_surname_one ||
    !client_telephone ||
    !client_email ||
    !password
  ) {
    //console.log("Faltan datos obligatorios en la solicitud");
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // **Paso 1: Hashear la contraseña antes de almacenarla**
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hash generado antes de guardarlo:", hashedPassword); // <-- Verificar el hash

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
        console.error("Error creando cliente:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const clientId = results.insertId; // Obtenemos el ID del cliente insertado

      // **Paso 3: Insertar la cuenta en la tabla `account`**
      const sqlAccount =
        "INSERT INTO account (account_client_id, account_passwd, account_points) VALUES (?, ?, ?)";

      const valuesAccount = [clientId, hashedPassword, 0]; // Inicializamos puntos en 0

      connection.query(sqlAccount, valuesAccount, (err, results) => {
        if (err) {
          console.error("Error creando cuenta:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "Cliente y cuenta creados con éxito" });
      });
    });
  } catch (error) {
    console.error("Error general en el registro:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getClientProfile = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const sql = `
    SELECT 
      c.client_id, 
      c.client_name, 
      c.client_email, 
      a.account_points 
    FROM client c
    JOIN account a ON c.client_id = a.account_client_id
    WHERE c.client_id = ?
  `;

  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("Error obteniendo perfil del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(results[0]);
  });
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientProfile,
};
