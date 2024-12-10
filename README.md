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

```
npm run test
```

### **Ejecutar Pruebas Individuales**

- Chai/Mocha/Supertest:

```
npm run chai
npm run mocha
npm run supertest
```

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
docker run -d -p 8000:8000 esthersmeke/backend3:1.0.0
```

Luego, accede a la aplicación en tu navegador en:
http://localhost:8000

### **🔗 Imagen en DockerHub**

Haz clic aquí para visitar la imagen pública en DockerHub:
[DockerHub - backend3](https://hub.docker.com/r/esthersmeke/backend3)

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
