-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2025 a las 22:17:14
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
CREATE DATABASE aplicacion_hotel;
USE aplicacion_hotel;
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `account` (
  `account_client_id` int(11) NOT NULL,
  `account_passwd` varchar(30) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `account_points` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_nacionality` varchar(100) NOT NULL,
  `client_doc_type` varchar(10) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `client_doc_id` varchar(30) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `client_name` varchar(50) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `client_surname_one` varchar(50) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `client_surname_two` varchar(50) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `client_prefix` int(4) NOT NULL,
  `client_telephone` int(20) NOT NULL,
  `client_email` varchar(100) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`client_id`, `client_nacionality`, `client_doc_type`, `client_doc_id`, `client_name`, `client_surname_one`, `client_surname_two`, `client_prefix`, `client_telephone`, `client_email`) VALUES
(1, '', 'passport', 'passportnu', 'daniel', 'manogil', 'Lasheras', 0, 2147483647, 'daniel@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_doc_id` int(10) NOT NULL,
  `emp_name` varchar(10) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `emp_surname_one` varchar(10) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `emp_surname_two` varchar(10) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `emp_telephone` int(10) NOT NULL,
  `emp_email` varchar(20) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `emp_manager_id` int(11) NOT NULL,
  `emp_password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `emp_hotel_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_doc_id`, `emp_name`, `emp_surname_one`, `emp_surname_two`, `emp_telephone`, `emp_email`, `emp_manager_id`, `emp_password`, `emp_hotel_id`) VALUES
(1, 12345678, 'Juan', 'P??rez', 'G??mez', 987654321, 'juan.perez@email.com', 1, 'password123', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee_reservation_log`
--

CREATE TABLE `employee_reservation_log` (
  `log_res_id` int(11) NOT NULL,
  `log_emp_id` int(11) NOT NULL,
  `log_op_date` datetime NOT NULL,
  `log_db_query` text CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `log_db_original` text CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `hotel_id` int(6) NOT NULL,
  `hotel_address` varchar(20) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `hotel_telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`hotel_id`, `hotel_address`, `hotel_telephone`) VALUES
(1, 'Avenida Denia 123, C', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(6) NOT NULL,
  `invoice_client_id` int(6) NOT NULL,
  `invoice_res_id` int(6) NOT NULL,
  `ivoice_date` date NOT NULL,
  `invoice_pay_method` varchar(10) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `invoice_code_transact` int(20) NOT NULL,
  `invoice_points_used` int(10) NOT NULL,
  `invoice_details` text CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `invoice_total_price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `res_id` int(6) NOT NULL,
  `res_client_id` int(6) NOT NULL,
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
  `res_checkout_by` int(6) NOT NULL,
  `res_observations` text CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `res_wants_double` tinyint(1) NOT NULL,
  `res_file_one` int(11) DEFAULT NULL,
  `res_file_two` int(11) DEFAULT NULL,
  `res_file_three` int(11) DEFAULT NULL,
  `res_add_points` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reservation`
--

INSERT INTO `reservation` (`res_id`, `res_client_id`, `res_room_id`, `res_room_hotel_id`, `res_checkin`, `res_checkout`, `res_hour_checkin`, `res_hour_checkout`, `res_is_checkin`, `res_is_checkout`, `res_is_closed`, `res_checkin_by`, `res_checkout_by`, `res_observations`, `res_wants_double`, `res_file_one`, `res_file_two`, `res_file_three`, `res_add_points`) VALUES
(2, 1, 100, 1, '2025-02-05', '2025-02-15', '2025-02-05 19:30:52.000000', '2025-02-15 19:30:52.000000', 0, 0, 0, 1, 1, '', 0, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_hotel_id` int(11) NOT NULL,
  `room_type` varchar(20) NOT NULL,
  `room_base_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `room`
--

INSERT INTO `room` (`room_id`, `room_hotel_id`, `room_type`, `room_base_price`) VALUES
(100, 1, 'standard', 65.00),
(101, 1, 'standard', 65.00),
(102, 1, 'standard', 65.00),
(103, 1, 'standard', 65.00),
(104, 1, 'standard', 65.00),
(105, 1, 'standard-family', 80.00),
(106, 1, 'standard-family', 80.00),
(107, 1, 'plus', 100.00),
(108, 1, 'plus-family', 120.00),
(109, 1, 'plus-jacuzzi', 130.00),
(110, 1, 'standard-family', 120.00),
(200, 1, 'plus-views', 150.00),
(201, 1, 'plus-jacuzzy-views', 170.00),
(202, 1, 'plus-jacuzzi', 150.00),
(401, 1, 'suite', 200.00),
(402, 1, 'presidential', 220.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shift`
--

CREATE TABLE `shift` (
  `shift_emp_id` int(11) NOT NULL,
  `shift_date_in` datetime(6) NOT NULL,
  `shift_date_out` datetime(6) NOT NULL,
  `hours_worked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_room`
--

CREATE TABLE `type_room` (
  `room_type` varchar(20) NOT NULL,
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
('plus-family-views', 4, 30, 1, 0, 0, 1),
('plus-jacuzzi', 2, 22, 0, 1, 0, 1),
('plus-jacuzzy-views', 2, 22, 1, 1, 0, 1),
('plus-views', 2, 22, 1, 0, 0, 1),
('presidential', 4, 40, 1, 1, 1, 1),
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
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Indices de la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`,`invoice_client_id`,`invoice_res_id`),
  ADD KEY `invoice-reservation` (`invoice_res_id`),
  ADD KEY `invoice-client` (`invoice_client_id`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `reservation-client` (`res_client_id`),
  ADD KEY `reservation-room` (`res_room_hotel_id`,`res_room_id`),
  ADD KEY `reservation-employee-in` (`res_checkin_by`),
  ADD KEY `reservation-employee-out` (`res_checkout_by`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`,`room_hotel_id`) USING BTREE,
  ADD KEY `room-hotel` (`room_hotel_id`),
  ADD KEY `room-type` (`room_type`);

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
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `hotel_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `res_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `invoice-client` FOREIGN KEY (`invoice_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice-reservation` FOREIGN KEY (`invoice_res_id`) REFERENCES `reservation` (`res_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation-client` FOREIGN KEY (`res_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-in` FOREIGN KEY (`res_checkin_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-out` FOREIGN KEY (`res_checkout_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-room` FOREIGN KEY (`res_room_hotel_id`,`res_room_id`) REFERENCES `room` (`room_hotel_id`, `room_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room-hotel` FOREIGN KEY (`room_hotel_id`) REFERENCES `hotel` (`hotel_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `room-type` FOREIGN KEY (`room_type`) REFERENCES `type_room` (`room_type`);

--
-- Filtros para la tabla `shift`
--
ALTER TABLE `shift`
  ADD CONSTRAINT `shift-employee` FOREIGN KEY (`shift_emp_id`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
