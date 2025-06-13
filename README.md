
<img src="https://flagcdn.com/w20/es.png" width="20"/> [Leer en español](#proyecto-final-daw---gestión-de-hotel)   

📸 [Screenshots](#screenshots)


<br>


# Hotel Management App

This repository contains the development of the final project for the second year of the Higher Vocational Training Degree in Web Application Development.

This project is a web application for a hotel that allows users to register, log in, and make room reservations. The frontend is built with React, providing a dynamic and responsive user interface, while the backend is powered by Express, handling authentication, booking management, and data storage.

## Project Structure

- `/backend-hotel`: Server logic with Node.js, Express, and Nodemon
  - `src/config`: Database configuration
  - `src/controllers`: Business logic controllers
  - `src/models`: Data models (system entities)
  - `src/routes`: API routes organized by modules
  - `src/server.js`: Server entry point
- `/frontend`: Client application developed with React, Vite, and Bootstrap
- `/Bases-De-Datos`: SQL scripts and MySQL database structure
- `/Diseño-Grafico`: Mockups, designs, and visual resources
- `/docs`: Technical documentation and project planning

## Branches

- `main`: Main and stable branch of the project.
- `progresos`: Working branch for progress and testing.

## Requirements

- Node.js and npm  
- MySQL or MariaDB  
- React + Vite  
- Bootstrap  
- Nodemon  

## Usage Instructions (local setup)

1. Clone the repository:

   ```bash
   git clone https://github.com/EduZu32/Proyecto.git
   cd Proyecto
  

2. Install backend dependencies:

   ```bash
   cd backend-hotel
   npm install

   
3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install

   
4. Run the backend with Nodemon:

   ```bash
   cd ../backend-hotel
   npx nodemon src/server.js
   

  5. Clone the repository:

   ```bash
   cd frontend
   npm run dev
```


## Project Authors

**[Noelia Cegarra Castillo - Ccaileon](https://github.com/ccaileon)**  
Full-Stack Web Developer | Web Application Development (DAW) Student

**[Eduard-Ciprian Apatachioae - EduZu32](https://github.com/EduZu32)**  
Web Developer & IT Technician | Web Application Development (DAW) Student

**[Daniel Mañogil Lasheras - DanielManogilLasheras](https://github.com/DanielManogilLasheras)**  
Full-Stack Web Developer | Web Application Development (DAW) Student
   

---
<br>

# Proyecto Final DAW - Gestión de Hotel

Este repositorio contiene el desarrollo del proyecto final del segundo año del Grado Superior de Desarrollo de Aplicaciones Web (DAW).

## Estructura del Proyecto

- `/backend-hotel`: Lógica del servidor con Node.js, Express y Nodemon
  - `src/config`: Configuración de base de datos
  - `src/controllers`: Controladores de lógica de negocio
  - `src/models`: Modelos de datos (entidades del sistema)
  - `src/routes`: Rutas API organizadas por módulos
  - `src/server.js`: Punto de entrada del servidor
- `/frontend`: Aplicación cliente desarrollada con React, Vite y Bootstrap
- `/Bases-De-Datos`: Scripts SQL y estructura de la base de datos MySQL
- `/Diseño-Grafico`: Mockups, diseños y recursos visuales
- `/docs`: Documentación técnica y planificación del proyecto

## Ramas

- `main`: Rama principal y estable del proyecto.
- `progresos`: Rama de trabajo para avances y pruebas.

## Requisitos

- Node.js y npm
- MySQL o MariaDB
- React + Vite
- Bootstrap
- Nodemon

## Instrucciones de uso (modo local)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/EduZu32/Proyecto.git
   cd Proyecto
   ```

2. Instala las dependencias del backend:

   ```bash
   cd backend-hotel
   npm install
   ```

3. Instala las dependencias del frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Ejecuta el backend con Nodemon:

   ```bash
   cd ../backend-hotel
   npx nodemon src/server.js
   ```

5. Ejecuta el frontend (en otra terminal):
   ```bash
   cd frontend
   npm run dev
   ```



## Autores del Proyecto

**[Noelia Cegarra Castillo - Ccaileon](https://github.com/ccaileon)**  
Desarrolladora Web Full-Stack | Estudiante de DAW

**[Eduard-Ciprian Apatachioae - EduZu32](https://github.com/EduZu32)**  
Desarrollador Web y Técnico Informático | Estudiante de DAW

**[Daniel Mañogil Lasheras - DanielManogilLasheras](https://github.com/DanielManogilLasheras)**  
Desarrollador Web Full-Stack | Estudiante de DAW

---
<br>

## Screenshots

<br>

**Client Side**


1. Home Page
![Home Page](/screenshots/index.png)  
2. Login
![Login](/screenshots/login.png)  
3. Rooms
![Rooms](/screenshots/rooms.png)  
4. Services
![Services](/screenshots/services.png)  
5. Contact
![Contact](/screenshots/contact.png)  
6. Room Search
![Room Search](/screenshots/room-search.png)  
7. Checkout
![Checkout](/screenshots/checkout.png)  

<br>
**Employee Side**

1. Index/Carousel Menu
![Index](/screenshots/employee-menu-carousel.png)  
3. Booking Management
![Booking Management](/screenshots/employee-booking-management.png)  
5. Rooms Management
![Rooms Management](/screenshots/employee-rooms.png)  


