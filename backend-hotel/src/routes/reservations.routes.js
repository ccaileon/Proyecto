const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const { updateReservationStatus } = reservationController;
const verifyToken = require("../../middlewares/verifyToken");

router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation);

// ✅ RUTAS PRIVADAS (reservas internas para empleados)
router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation);

// ✅ RUTA PRIVADA para clientes logueados que reservan
router.post("/client", verifyToken, reservationController.createReservation);
router.get(
  "/client/my-reservations",
  verifyToken,
  reservationController.getMyReservations
);

// ✅ RUTA PRIVADA para empleados
router.put("/:id/status", verifyToken, updateReservationStatus);

// ✅ RUTA PÚBLICA para crear reservas sin cuenta
router.post("/guest", reservationController.createReservationForGuest);

// Exportar el router
module.exports = router;
