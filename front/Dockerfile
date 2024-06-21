# Multi-stage build

## -------------- FRONT  -------------- 
# Imagen oficial de Node
FROM node:18-alpine as build

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar dependencias al contenedor
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al directorio de trabajo en el contenedor
COPY . .

# Construir Aplicación
RUN npm run build

## -------------- SERVER  --------------

# Imagen de Nginx
FROM nginx:alpine

# Copiar archivos a Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
