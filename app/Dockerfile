# Imagen oficial de Python
FROM python:3.8

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo requirements.txt primero para el uso del caché de Docker
COPY requirements.txt requirements.txt

# Instalar las dependencias del proyecto
RUN pip install -r requirements.txt

# Copiar el resto de los archivos del proyecto al directorio de trabajo en el contenedor
COPY . /app

# Exponer el puerto 5000 para que la aplicación Flask sea accesible
EXPOSE 5000

# Comando por defecto para ejecutar la aplicación con Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "__init__:app"]