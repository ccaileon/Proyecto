# 🏨 Proyecto Backend - API Hotel

Este documento proporciona instrucciones para instalar, configurar y ejecutar el backend de la API del hotel, asegurando una correcta conexión con la base de datos y la integración con el frontend.

---

## 📌 Requisitos Previos

Antes de instalar las dependencias y ejecutar el servidor, asegúrate de tener instalado lo siguiente en tu sistema:

✅ **Node.js** (Versión recomendada: **18.x o superior**)  
✅ **MySQL** (o MariaDB)  
✅ **Postman** (opcional, para probar la API)  
✅ **Git** (opcional, para clonar el repositorio)

---

## 🚀 Instalación y Configuración

### **1️⃣ Clonar el repositorio**

```
git clone https://github.com/TuUsuario/Proyecto-Hotel.git
cd Proyecto-Hotel/backend-hotel
```

### **2️⃣ Instalar dependencias de Node.js**

Ejecuta el siguiente comando dentro de la carpeta **backend-hotel**:

```
npm install
```

📦 **Dependencias clave instaladas:**

- `express` → Framework para manejar peticiones HTTP.
- `cors` → Permite la comunicación entre frontend y backend.
- `dotenv` → Carga variables de entorno desde `.env`.
- `mysql2` → Cliente para conectarse a MySQL.
- `nodemon` (DevDependency) → Reinicio automático del servidor en cambios.

---

## 🔑 Configuración de la Base de Datos

### **3️⃣ Crear la base de datos en MySQL**

Abre MySQL y ejecuta:

```
CREATE DATABASE aplicacion_hotel;
```

📍 **Cargar la estructura desde el archivo SQL**  
Si tienes el archivo `aplicacion_hotel.sql`, impórtalo en MySQL con:

```
mysql -u root -p aplicacion_hotel < aplicacion_hotel.sql
```

### **4️⃣ Configurar la conexión con MySQL**

En la raíz del backend, hay un archivo **`.env`** donde se configuran las credenciales de la base de datos.  
Si no existe, créalo y agrega:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_mysql
DB_NAME=aplicacion_hotel
PORT=3000
```

📌 **Recuerda:** Si cambias los datos de la base de datos en MySQL, actualízalos aquí.

---

## 🏗 Estructura del Proyecto

```
backend-hotel/
│── src/
│   ├── config/
│   │   ├── db.js         # Configuración de la conexión MySQL
│   ├── controllers/      # Controladores de cada entidad
│   ├── models/           # Modelos de la base de datos
│   ├── routes/           # Rutas de la API
│   ├── server.js         # Punto de entrada del servidor
│── .env                  # Variables de entorno
│── package.json          # Dependencias y scripts de Node.js
│── README.md             # Documentación del proyecto
```

---

## ▶️ Ejecutar el Servidor

### **5️⃣ Iniciar el backend**

Para ejecutar el backend en desarrollo:

```
npm run dev
```

📌 Usa `nodemon` para reiniciar automáticamente el servidor si detecta cambios.

Para ejecutar en producción:

```
node src/server.js
```

### **6️⃣ Verificar que la API está corriendo**

Abre tu navegador o por ejemplo Postman, Thunder Client y accede a:

```
http://localhost:3000/api/hotels
```

Si todo está correcto, deberías ver un **JSON** con los datos de los hoteles.

---

## 🔗 Conexión con el Frontend

Si tienes el frontend desarrollado , sigue estos pasos:

```
cd ../frontend/react-app
npm install   # Instala las dependencias del frontend
npm run dev   # Inicia la aplicación en modo desarrollo
```

Por defecto, el frontend se ejecutará en:

```
http://localhost:5173
```

Y el backend en:

```
http://localhost:3000
```

---

## 🔥 Solución de Errores Comunes

🔴 **Error: "Cannot connect to MySQL"**  
🔹 Revisa que MySQL esté corriendo con:

```
sudo systemctl start mysql  # En Linux
net start MySQL             # En Windows
```

🔴 **Error: "EADDRINUSE: Address already in use"**  
🔹 Significa que el puerto **3000** ya está en uso. El servidor automáticamente buscará el siguiente disponible.

🔴 **Error en instalación de paquetes (`ERESOLVE`)**  
🔹 Fuerza la instalación con:

```
npm install --legacy-peer-deps
```

---

## 📜 Licencia

Este proyecto es de código abierto y está bajo la **Licencia MIT**.

---

📌 **Listo!** Ahora ya tienes un backend funcional y conectado con MySQL. 🚀
