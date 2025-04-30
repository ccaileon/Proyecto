-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2025 a las 16:54:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aplicacion_hotel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `account` (
  `account_client_id` int(11) NOT NULL,
  `account_passwd` varchar(100) DEFAULT NULL,
  `account_points` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`account_client_id`, `account_passwd`, `account_points`) VALUES
(15, '$2b$10$kqe6za5bKkNwGlawPZageOO/xIMQCA4rzNQAdASz.Vi1nGjwnd7Wa', 0),
(16, '$2b$10$4fN5oxbRgctjp/OdSHcri.riTUDM6HA6hRuDGKTQoJ9WL3Z7Pzmou', 0),
(17, '$2b$10$nrg60G09laFJ2JjqXQLk0uVFw4eqEHYLdBqs4iQ0p38BNSF3/1.R2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_doc_type` varchar(10) NOT NULL,
  `client_doc_id` varchar(10) NOT NULL,
  `client_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `client_surname_one` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `client_surname_two` varchar(20) NOT NULL,
  `client_telephone` int(20) NOT NULL,
  `client_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`client_id`, `client_doc_type`, `client_doc_id`, `client_name`, `client_surname_one`, `client_surname_two`, `client_telephone`, `client_email`) VALUES
(15, '', '', 'Prueba', '1', '', 612345678, 'prueba1@gmail.com'),
(16, '', '', 'Prueba', '2', '', 612345678, 'prueba2@gmail.com'),
(17, '', '', 'Eduard', 'Ciprian', '', 222333444, 'eduzu@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_doc_id` varchar(15) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_surname_one` varchar(10) NOT NULL,
  `emp_surname_two` varchar(10) NOT NULL,
  `emp_telephone` int(10) NOT NULL,
  `emp_email` varchar(100) NOT NULL,
  `emp_manager_id` int(11) NOT NULL,
  `emp_password` varchar(100) NOT NULL,
  `emp_hotel_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_doc_id`, `emp_name`, `emp_surname_one`, `emp_surname_two`, `emp_telephone`, `emp_email`, `emp_manager_id`, `emp_password`, `emp_hotel_id`) VALUES
(2, '12345678', 'Juan', 'Pérez', 'Gómez', 987654321, 'juan.perez@email.com', 1, '$2a$10$XOZ5spTY86COtFTk7CMaY.EgF.NH4OQgvpH4sPbLW4lZ92GJnUzyu', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee_reservation_log`
--

CREATE TABLE `employee_reservation_log` (
  `log_res_id` int(11) NOT NULL,
  `log_emp_id` int(11) NOT NULL,
  `log_op_date` datetime NOT NULL,
  `log_db_query` text NOT NULL,
  `log_db_original` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guest`
--

CREATE TABLE `guest` (
  `guest_id` int(11) NOT NULL,
  `guest_name` varchar(100) NOT NULL,
  `guest_lastname` varchar(100) NOT NULL,
  `guest_email` varchar(100) DEFAULT NULL,
  `guest_phone` varchar(20) DEFAULT NULL,
  `guest_preferences` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `guest`
--

INSERT INTO `guest` (`guest_id`, `guest_name`, `guest_lastname`, `guest_email`, `guest_phone`, `guest_preferences`) VALUES
(19, 'Eva', 'Martín', 'eva@gmail.com', '123456789', 'doble'),
(20, 'Eduard', 'Prueba2', 'eduard@gmail.com', '123456789', 'doble');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `hotel_id` int(6) NOT NULL,
  `hotel_address` varchar(20) NOT NULL,
  `hotel_telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`hotel_id`, `hotel_address`, `hotel_telephone`) VALUES
(1, 'Calle Ejemplo 123, C', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `invoice_code_transact` int(11) DEFAULT NULL,
  `invoice_details` text DEFAULT NULL,
  `invoice_pay_method` varchar(10) DEFAULT NULL,
  `invoice_points_used` int(11) DEFAULT NULL,
  `invoice_total_price` decimal(10,2) DEFAULT NULL,
  `invoice_date` date DEFAULT curdate(),
  `invoice_res_id` int(11) DEFAULT NULL,
  `invoice_client_id` int(11) DEFAULT NULL,
  `invoice_guest_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_code_transact`, `invoice_details`, `invoice_pay_method`, `invoice_points_used`, `invoice_total_price`, `invoice_date`, `invoice_res_id`, `invoice_client_id`, `invoice_guest_id`) VALUES
(1, NULL, 'Habitación doble, 2 adultos, 0 niños, 5 noches', 'tarjeta', 0, 605.00, '2025-04-04', 25, NULL, 19),
(2, NULL, 'Habitación plus, 2 adultos, 0 niños, 3 noches', 'tarjeta', 0, 363.00, '2025-04-04', 26, NULL, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `res_id` int(6) NOT NULL,
  `res_client_id` int(11) DEFAULT NULL,
  `res_room_id` int(6) NOT NULL,
  `res_room_hotel_id` int(6) NOT NULL,
  `res_checkin` date NOT NULL,
  `res_checkout` date NOT NULL,
  `res_hour_checkin` datetime(6) NOT NULL,
  `res_hour_checkout` datetime(6) NOT NULL,
  `res_is_checkin` tinyint(1) NOT NULL,
  `res_is_checkout` tinyint(1) NOT NULL,
  `res_is_closed` tinyint(1) NOT NULL,
  `res_checkin_by` int(6) NOT NULL,
  `res_checkout_by` int(11) DEFAULT NULL,
  `res_observations` text NOT NULL,
  `res_wants_double` tinyint(1) NOT NULL,
  `res_file_one` int(11) DEFAULT NULL,
  `res_file_two` int(11) DEFAULT NULL,
  `res_file_three` int(11) DEFAULT NULL,
  `res_add_points` int(5) NOT NULL,
  `res_guest_id` int(11) DEFAULT NULL,
  `res_state` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `reservation`
--

INSERT INTO `reservation` (`res_id`, `res_client_id`, `res_room_id`, `res_room_hotel_id`, `res_checkin`, `res_checkout`, `res_hour_checkin`, `res_hour_checkout`, `res_is_checkin`, `res_is_checkout`, `res_is_closed`, `res_checkin_by`, `res_checkout_by`, `res_observations`, `res_wants_double`, `res_file_one`, `res_file_two`, `res_file_three`, `res_add_points`, `res_guest_id`, `res_state`) VALUES
(25, NULL, 25, 1, '2025-05-07', '2025-05-08', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 0, 0, 0, 2, 2, 'Sin alergias', 0, NULL, NULL, NULL, 0, 19, 'pendiente'),
(26, NULL, 36, 1, '2025-04-09', '2025-04-12', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 0, 0, 0, 2, 2, 'Galletas y Zumitos.', 0, NULL, NULL, NULL, 0, 20, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_hotel_id` int(11) NOT NULL,
  `room_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `room_capacity` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `room`
--

INSERT INTO `room` (`room_id`, `room_hotel_id`, `room_type`, `room_capacity`) VALUES
(3, 1, 'suite', 4),
(4, 1, 'suite', 4),
(21, 1, 'plus-family', 4),
(22, 1, 'plus-family', 4),
(23, 1, 'plus-family', 4),
(24, 1, 'plus-family', 4),
(25, 1, 'plus-family', 4),
(26, 1, 'plus-family', 4),
(27, 1, 'plus-family', 4),
(28, 1, 'plus-family', 4),
(29, 1, 'plus-family', 4),
(30, 1, 'plus-family', 4),
(31, 1, 'plus-family', 4),
(32, 1, 'plus-family', 4),
(33, 1, 'plus-family', 4),
(34, 1, 'plus-family', 4),
(35, 1, 'plus-family', 4),
(36, 1, 'plus', 2),
(37, 1, 'plus', 2),
(38, 1, 'plus', 2),
(39, 1, 'plus', 2),
(40, 1, 'plus', 2),
(41, 1, 'plus', 2),
(42, 1, 'plus', 2),
(43, 1, 'plus', 2),
(44, 1, 'plus', 2),
(45, 1, 'plus', 2),
(46, 1, 'plus', 2),
(47, 1, 'plus', 2),
(48, 1, 'plus', 2),
(49, 1, 'plus', 2),
(50, 1, 'plus', 2),
(51, 1, 'plus', 2),
(52, 1, 'plus', 2),
(53, 1, 'plus', 2),
(54, 1, 'plus', 2),
(55, 1, 'plus', 2),
(56, 1, 'suite', 4),
(57, 1, 'suite', 4),
(58, 1, 'suite', 4),
(59, 1, 'standard', 2),
(60, 1, 'standard-family', 4),
(61, 1, 'standard', 2),
(62, 1, 'standard-family', 4),
(63, 1, 'standard-family', 4),
(64, 1, 'standard-family', 4),
(65, 1, 'standard', 2),
(66, 1, 'standard', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shift`
--

CREATE TABLE `shift` (
  `shift_emp_id` int(11) NOT NULL,
  `shift_date_in` datetime(6) NOT NULL,
  `shift_date_out` datetime(6) NOT NULL,
  `hours_worked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_room`
--

CREATE TABLE `type_room` (
  `room_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `room_capacity` int(1) NOT NULL,
  `room_mts_square` decimal(10,0) NOT NULL,
  `room_has_views` tinyint(1) NOT NULL,
  `room_has_jacuzzi` tinyint(1) NOT NULL,
  `room_has_balcony` int(11) NOT NULL,
  `room_has_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `type_room`
--

INSERT INTO `type_room` (`room_type`, `room_capacity`, `room_mts_square`, `room_has_views`, `room_has_jacuzzi`, `room_has_balcony`, `room_has_service`) VALUES
('plus', 2, 22, 0, 0, 0, 1),
('plus-family', 4, 30, 0, 0, 0, 1),
('standard', 2, 18, 0, 0, 0, 0),
('standard-family', 4, 25, 0, 0, 0, 0),
('suite', 4, 30, 1, 1, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_client_id`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indices de la tabla `employee_reservation_log`
--
ALTER TABLE `employee_reservation_log`
  ADD PRIMARY KEY (`log_res_id`,`log_emp_id`),
  ADD KEY `log-employee` (`log_emp_id`);

--
-- Indices de la tabla `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Indices de la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `fk_invoice_res` (`invoice_res_id`),
  ADD KEY `fk_invoice_client` (`invoice_client_id`),
  ADD KEY `fk_invoice_guest` (`invoice_guest_id`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `reservation-client` (`res_client_id`),
  ADD KEY `reservation-room` (`res_room_hotel_id`,`res_room_id`),
  ADD KEY `reservation-employee-in` (`res_checkin_by`),
  ADD KEY `reservation-employee-out` (`res_checkout_by`),
  ADD KEY `fk_reservation_guest` (`res_guest_id`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`,`room_hotel_id`) USING BTREE,
  ADD KEY `room-hotel` (`room_hotel_id`),
  ADD KEY `fk_room_type` (`room_type`);

--
-- Indices de la tabla `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_emp_id`);

--
-- Indices de la tabla `type_room`
--
ALTER TABLE `type_room`
  ADD PRIMARY KEY (`room_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `guest`
--
ALTER TABLE `guest`
  MODIFY `guest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `hotel_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `res_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account-client` FOREIGN KEY (`account_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `employee_reservation_log`
--
ALTER TABLE `employee_reservation_log`
  ADD CONSTRAINT `log-employee` FOREIGN KEY (`log_emp_id`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `log-reservation` FOREIGN KEY (`log_res_id`) REFERENCES `reservation` (`res_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_invoice_client` FOREIGN KEY (`invoice_client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `fk_invoice_guest` FOREIGN KEY (`invoice_guest_id`) REFERENCES `guest` (`guest_id`),
  ADD CONSTRAINT `fk_invoice_res` FOREIGN KEY (`invoice_res_id`) REFERENCES `reservation` (`res_id`);

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_guest` FOREIGN KEY (`res_guest_id`) REFERENCES `guest` (`guest_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reservation-client` FOREIGN KEY (`res_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-in` FOREIGN KEY (`res_checkin_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-out` FOREIGN KEY (`res_checkout_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-room` FOREIGN KEY (`res_room_hotel_id`,`res_room_id`) REFERENCES `room` (`room_hotel_id`, `room_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_type` FOREIGN KEY (`room_type`) REFERENCES `type_room` (`room_type`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room-hotel` FOREIGN KEY (`room_hotel_id`) REFERENCES `hotel` (`hotel_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `shift`
--
ALTER TABLE `shift`
  ADD CONSTRAINT `shift-employee` FOREIGN KEY (`shift_emp_id`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
