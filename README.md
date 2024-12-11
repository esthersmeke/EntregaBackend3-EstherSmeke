# Backend Mocking Project

Este proyecto es un servidor Express que implementa un sistema de mocking para generar usuarios y productos en una base de datos MongoDB. Utiliza Mongoose para la interacción con la base de datos y Winston para el registro de logs.

## 🧩 Características

- Gestión de Datos: Generación y manejo de usuarios y productos.
- Persistencia de Datos: Almacenamiento en MongoDB.
- Logs y Manejo de Errores: Registro de eventos y errores usando Winston.
- Variables de Entorno: Configuración segura con archivos .env.

## 📂 Repositorio

```
 git clone https://github.com/esthersmeke/EntregaBackend3-EstherSmeke.git
```

## 🧪 Tests Automatizados

### **Ejecutar Todas las Pruebas**

Asegúrate de ejecutar el entorno de test:

```
npm run test
```

### **Ejecutar Pruebas Individuales**

- Chai/Mocha/Supertest:

```
npm run chai
npm run mocha
npm run supertest
npm run stress
```

Las pruebas de estrés evalúan la capacidad del sistema para manejar múltiples solicitudes concurrentes en los siguientes escenarios:

- Creación de Productos Concurrente:
  Simula la creación de 50 productos de manera simultánea.

- Operaciones con Carritos:
  Simula la creación y actualización de 100 carritos con productos.

- Registro de Usuarios Concurrente:
  Simula el registro de 50 usuarios al mismo tiempo.

- Consultas Concurrentes:
  Ejecuta 100 solicitudes simultáneas para leer productos.

\*\* Estas pruebas aseguran que el sistema se desempeña correctamente bajo una carga elevada y garantiza la estabilidad de los endpoints principales.

## 📖 Documentación de la API

La API está documentada usando Swagger, lo que permite explorar y probar los endpoints fácilmente.

### **Acceso a la Documentación**

- Una vez que el servidor esté corriendo en dev, puedes acceder a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

- Características de la Documentación

1. Exploración Visual:
   Puedes visualizar todos los endpoints disponibles para Usuarios, Productos y Carritos.

2. Pruebas Interactivas:
   Realiza pruebas directamente desde la interfaz Swagger.

3. Esquemas Detallados:
   Información sobre los modelos de datos esperados en cada endpoint.

### **Endpoints Disponibles**

- Usuarios
  POST /api/users - Crear un nuevo usuario.
  GET /api/users - Consultar todos los usuarios.
  GET /api/users/:uid - Consultar un usuario por ID.
  PUT /api/users/:uid - Actualizar un usuario.
  DELETE /api/users/:uid - Eliminar un usuario.

- Productos
  POST /api/products - Crear un nuevo producto.
  GET /api/products - Consultar todos los productos.
  GET /api/products/:pid - Consultar un producto por ID.
  PUT /api/products/:pid - Actualizar un producto.
  DELETE /api/products/:pid - Eliminar un producto.

- Carritos
  POST /api/carts - Crear un nuevo carrito.
  GET /api/carts - Consultar todos los carritos.
  GET /api/carts/:cid - Consultar un carrito por ID.
  PUT /api/carts/:cid - Actualizar un carrito.
  DELETE /api/carts/:cid - Eliminar un carrito.

## 🚢 Docker Deployment

### **🛠️ Construir la Imagen de Docker**

- Ejecuta este comando para construir la imagen del proyecto:

```
npm run create-image
```

### **▶️ Ejecutar la Imagen de Docker**

- Para ejecutar el contenedor en el puerto 8000, usa:

```
npm run run-image
```

### **📤 Subir la Imagen a DockerHub (Opcional)**

- Si deseas subir la imagen a DockerHub, sigue estos pasos:

1. Renombrar la Imagen:

```
npm run rename-image
```

2. Subir a DockerHub:

```
npm run push-image
```

### **💻 Uso con Docker (Sin Clonar el Repositorio)**

- Si prefieres ejecutar la aplicación directamente desde DockerHub sin clonar el repositorio ni instalar dependencias, usa:

```
docker run -d -p 8000:8000 esthersmeke/backend3:1.0.1
```

Luego, accede a la aplicación en tu navegador en:
http://localhost:8000

### **🔗 Imagen en DockerHub**

Haz clic aquí para visitar la imagen pública en DockerHub:
[DockerHub - backend3](https://hub.docker.com/r/esthersmeke/backend3)

## 🚀 Aplicación en Producción

La aplicación está desplegada y accesible en Railway. Puedes probar la API o la documentación de Swagger en los siguientes enlaces:

- API Base: https://tu-nueva-url-en-railway
- Documentación Swagger: https://tu-nueva-url-en-railway/api/docs

## 🗂️ Estructura del Proyecto

```
📂 src
┣ 📂 controllers
┃ ┣ 📜 carts.controller.js
┃ ┣ 📜 products.controller.js
┃ ┗ 📜 users.controller.js
┣ 📂 dao
┃ ┣ 📂 files
┃ ┃ ┣ 📜 carts.files.dao.js
┃ ┃ ┣ 📜 products.files.dao.js
┃ ┃ ┗ 📜 users.files.dao.js
┃ ┣ 📂 memory
┃ ┃ ┣ 📜 carts.memory.dao.js
┃ ┃ ┣ 📜 products.memory.dao.js
┃ ┃ ┗ 📜 users.memory.dao.js
┃ ┣ 📂 mongo
┃ ┃ ┣ 📜 carts.mongo.dao.js
┃ ┃ ┣ 📜 products.mongo.dao.js
┃ ┃ ┗ 📜 users.mongo.dao.js
┃ ┣ 📜 cart.model.js
┃ ┣ 📜 product.model.js
┃ ┗ 📜 user.model.js
┣ 📂 routes
┃ ┣ 📜 carts.router.js
┃ ┣ 📜 products.router.js
┃ ┗ 📜 users.router.js
┣ 📂 services
┃ ┣ 📜 carts.service.js
┃ ┣ 📜 products.service.js
┃ ┗ 📜 users.service.js
┣ 📂 test
┃ ┣ 📂 chai
┃ ┣ 📂 mocha
┃ ┗ 📂 supertest
┣ 📂 utils
┃ ┣ 📜 args.util.js
┃ ┣ 📜 db.util.js
┃ ┣ 📜 env.util.js
┃ ┣ 📜 errors.util.js
┃ ┣ 📜 logger.util.js
┃ ┗ 📜 seed.util.js
┣ 📜 index.js
┣ 📜 package.json
┣ 📜 .env
┣ 📜 README.md
┗ 📜 Dockerfile
```

- Implementamos clústeres para optimizar el uso de recursos del servidor en entornos locales (como se puede comprobar en las pruebas locales).
- Para el despliegue en Railway, optamos por un enfoque sin clústeres debido a las limitaciones del servicio y la necesidad de garantizar la funcionalidad de la aplicación.
