const express = require("express");
const cors = require("cors");
const hotelRoutes = require("./routes/hotels.routes");
const roomRoutes = require("./routes/rooms.routes");
const employeesRoutes = require("./routes/employees.routes"); // ✅ Importa las rutas de empleados
const reservationRoutes = require("./routes/reservations.routes"); // Importa las rutas de reservaciones
const clientsRoutes = require("./routes/clients.routes"); // Otras rutas
const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir JSON en las peticiones

// Rutas
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes); // ✅ Registra las rutas de reservaciones
app.use("/api/employees", employeesRoutes); // ✅ Registra las rutas de empleados
app.use("/api/clients", clientsRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
