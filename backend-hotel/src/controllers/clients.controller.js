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
    return res.json({ message: "Client successfully updated" }); // ✅ Se asegura de enviar una respuesta
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

const createClient = (req, res) => {
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
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO client (client_doc_type, client_doc_id, client_name, client_surname_one, client_surname_two, client_telephone, client_email) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    client_doc_type,
    client_doc_id,
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ Error creating client:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({
        message: "Client successfully created",
        clientID: results.insertId,
      });
    }
  });
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
