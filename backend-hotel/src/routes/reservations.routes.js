const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const verifyToken = require("../../middlewares/verifyToken");

/* // Middleware para verificar el token
router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.post("/", verifyToken, reservationController.createReservation);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation); */

// RUTAS PRIVADAS (solo empleados)
router.get("/", verifyToken, reservationController.getReservations); // con filtros
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation);

// RUTA PÚBLICA para crear reservas (clientes no logueados)
router.post("/", reservationController.createReservation);
router.post("/guest", reservationController.createReservationForGuest);

// (opcional) RUTA GET pública (por ejemplo: solo sus reservas)
//router.get("/public/client/:client_id", reservationController.getPublicReservations);

// Exportar el router
module.exports = router;
