const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/rooms.controller");
const verifyToken = require("../../middlewares/verifyToken");
const verifyManager = require("../../middlewares/verifyManager");

// ✅ Ruta de búsqueda de habitaciones
router.get("/search", RoomController.searchRooms);

// ✅ Habilitar y deshabilitar habitaciones
router.get("/enabled", verifyToken, RoomController.getEnabledRooms);
router.get("/disabled", verifyToken, RoomController.getDisabledRooms);

// Rutas CRUD normales
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.post("/", verifyToken, verifyManager, RoomController.createRoom);
router.put("/:id", verifyToken, verifyManager, RoomController.updateRoom);
router.delete("/:id", verifyToken, verifyManager, RoomController.deleteRoom);

// ✅ Habilitar y deshabilitar habitación
router.put(
  "/:id/enable",
  verifyToken,
  verifyManager,
  RoomController.enableRoom
);
router.put(
  "/:id/disable",
  verifyToken,
  verifyManager,
  RoomController.disableRoom
);

module.exports = router;
