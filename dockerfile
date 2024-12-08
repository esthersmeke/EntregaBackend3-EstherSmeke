# Dockerfile para producción
FROM node:18

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /backend3

# Copiar archivos de dependencias e instalar módulos
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Configurar la variable de entorno por defecto a `prod`
ENV MODE=prod

# Exponer el puerto 3000 para acceso externo
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "start"]
