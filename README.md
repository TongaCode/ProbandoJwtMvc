# 🏦 Homebanking API - Node.js

Este proyecto es una API REST que desarrollé con **Node.js** simulando un sistema bancario digital completo. Permite registrar usuarios, transferir dinero, operar con dólares, y gestionar cuentas de forma segura. 

Lo construí con un enfoque profesional, usando arquitectura limpia, inyección de dependencias, y buenas prácticas en el manejo de datos y seguridad.

---

## 🚀 Objetivo del proyecto

Mi objetivo fue aprender y aplicar conceptos reales de desarrollo backend, replicando funcionalidades que tendría una aplicación bancaria moderna:

- Transferencias entre cuentas
- Compra y venta de dólares
- Altas, bajas y modificaciones de usuarios
- Seguridad de datos y rutas
- Cuentas identificadas por **números de cuenta únicos**

Además, quise lograr una estructura mantenible y extensible para futuros módulos.

---
🧠 Tecnologías y herramientas utilizadas
Node.js

Express

MongoDB + Mongoose

JSON Web Tokens (JWT)

Bcrypt

Arquitectura en capas

Patrón de inyección de dependencias (propio)

Middlewares personalizados

## 🧱 Estructura del proyecto
```
📦 src
├── 📁 container # Contenedor personalizado de dependencias
├── 📁 controllers # Manejan la lógica de entrada (HTTP)
├── 📁 instancias # Archivo donde registro manualmente mis servicios y controladores
├── 📁 middelware # Validaciones y protección de rutas (JWT, validaciones, etc.)
├── 📁 models # Modelos de Mongoose para MongoDB
├── 📁 repositories # Acceso a la base de datos
├── 📁 routers # Rutas agrupadas por funcionalidad
├── 📁 service # Lógica de negocio de cada caso de uso
├── 📁 utils # Funciones reutilizables (como helpers o validadores)
├── 📁 views # (Opcional) para respuestas HTML o plantillas

Otros archivos importantes:

📄 .env # Variables de entorno
📄 .env.example # Ejemplo para compartir config
📄 app.js # Punto de entrada de la app
📄 package.json # Configuración del proyecto
```

---

## 🧠 Inyección de dependencias manual

Decidí no usar ningún framework externo como `Inversify` para profundizar y comprender mejor la inyeccion de dependencias, construí mi propio **contenedor de dependencias** para registrar e inyectar servicios y controladores.

Esto me permitió desacoplar las capas y mantener el código flexible y fácil de testear.
```
js
// Registro
container.register('crearUsuarioService', crearUsuarioService);

// Resolución
const crearUsuarioController = container.resolve('crearUsuarioController');

🛡️ Seguridad
Para proteger los datos de los usuarios y el sistema, implementé:

🔐 JWT (JSON Web Tokens) para autenticar sesiones

🔑 bcrypt para encriptar contraseñas antes de guardarlas en la base de datos

🧾 Middlewares que validan tokens y controlan el acceso a rutas protegidas

🛢️ Base de datos: MongoDB
Toda la información de usuarios, saldos, movimientos y operaciones se guarda en una base de datos MongoDB, utilizando Mongoose como ODM para definir esquemas, validar datos y simplificar operaciones con la base.

✨ Funcionalidades implementadas
Funcionalidad	Descripción
✅ Alta de usuarios	Registro de nuevos usuarios con validación de datos
🔁 Transferencias entre cuentas usando número de cuenta único
💵 Compra de dólares	Compra de dólares según cotización
💸 Venta de dólares	Venta de dólares con actualización de saldo en pesos
💳 Depósitos	Aumento de saldo en cuenta en pesos
🏧 Extracciones	Reducción de saldo en cuenta
✏️ Modificación de usuario	Cambios en los datos del usuario
❌ Baja de usuario	Eliminación lógica o total de la cuenta
🔐 Login y Logout	Inicio y cierre de sesión con token
🔒 Rutas protegidas	Acceso solo con token válido
```
⚙️ Cómo levantar el proyecto

Cloná el repositorio:
git clone https://github.com/tu-usuario/homebanking-api.git
cd homebanking-api

Instalá dependencias:
npm install

Configurá tu archivo .env:
cp .env.example .env

# Completá las variables como tu URI de MongoDB y JWT_SECRET
Ejecutá la aplicación:
node app.js

🙋‍♂️ Sobre mí
Hola, soy Gastón Iaria, desarrollador backend en formación. Este proyecto lo hice con el objetivo de demostrar mis conocimientos en arquitectura de software, buenas prácticas y dominio de Node.js.

💼 LinkedIn

📧 linkedin.com/in/gastoniaria

Gracias por visitar el repositorio. Todo feedback es bienvenido 🙌
