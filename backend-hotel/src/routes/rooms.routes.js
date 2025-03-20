const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/rooms.controller");

// ✅ Ruta de búsqueda de habitaciones
router.get("/search", RoomController.searchRooms);

// Rutas CRUD normales
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.post("/", RoomController.createRoom);
router.put("/:id", RoomController.updateRoom);
router.delete("/:id", RoomController.deleteRoom);


module.exports = router;
