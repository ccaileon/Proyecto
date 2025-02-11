const express = require("express");
const router = express.Router();
const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clients.controller");

router.get("/", getClients); // Get all clients
router.get("/:id", getClientById); // Get client by ID
router.post("/", createClient); // Create a new client
router.put("/:id", updateClient); // Update client by ID
router.delete("/:id", deleteClient); // Delete client by ID

module.exports = router;
