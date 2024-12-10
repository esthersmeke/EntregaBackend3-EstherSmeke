# 1. Usar una imagen base ligera de Node.js
FROM node:18-alpine

# 2. Definir el directorio de trabajo
WORKDIR /backend3

# 3. Copiar solo los archivos de dependencias para aprovechar la caché
COPY package*.json ./

# 4. Instalar dependencias de producción
RUN npm ci --only=production

# 5. Copiar el resto de los archivos del proyecto
COPY . .

# 6. Configurar la variable de entorno para el modo de producción
ENV MODE=prod

# 7. Exponer el puerto a usar
EXPOSE 8000

# 8. Comando para iniciar la aplicación
CMD ["npm", "start"]
