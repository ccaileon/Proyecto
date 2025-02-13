const express = require("express");
const router = express.Router(); // ✅ Define router correctamente
const RoomController = require("../controllers/rooms.controller"); // Asegúrate de que el nombre y la ruta sean correctos

// Rutas
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.post("/", RoomController.createRoom);
router.put("/:id", RoomController.updateRoom);
router.delete("/:id", RoomController.deleteRoom);

module.exports = router;
