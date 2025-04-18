const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const verifyToken = require("../../middlewares/verifyToken");

/* // Middleware para verificar el token
router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation); */

// ✅ RUTAS PRIVADAS (reservas internas para empleados)
router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation);

// ✅ RUTA PRIVADA para clientes logueados que reservan
router.post("/client", verifyToken, reservationController.createReservation);
router.get("/client/my-reservations", verifyToken, reservationController.getMyReservations);



// ✅ RUTA PÚBLICA para crear reservas sin cuenta
router.post("/guest", reservationController.createReservationForGuest);

// (opcional) RUTA GET pública (por ejemplo: solo sus reservas)
//router.get("/public/client/:client_id", reservationController.getPublicReservations);

// Exportar el router
module.exports = router;
