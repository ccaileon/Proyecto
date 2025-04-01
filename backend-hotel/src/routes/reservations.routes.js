const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const verifyToken = require("../../middlewares/verifyToken");

router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.post("/", verifyToken, reservationController.createReservation);
router.put("/:id", verifyToken, reservationController.updateReservation);
router.delete("/:id", verifyToken, reservationController.deleteReservation);

module.exports = router;
