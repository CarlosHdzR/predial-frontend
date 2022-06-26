# Plataforma de Gestión Catastral
Plataforma que permite gestionar el cobro catastral de los predios de una ciudad.  
Los tipos de usuarios que maneja el sistema son **Administrador (rol 1)**, **Usuario Interno (rol 2)** y **Usuario Externo (rol 3)**.

El administrador tiene control total de la plataforma y por lo tanto está en la capacidad de:
* Crear usuarios internos.
* Gestionar usuarios (internos y externos).
* Crear predios.
* Gestionar predios.

El usuario interno está en la capacidad de:
* Crear predios.
* Gestionar predios.

El usuario externo está en la capacidad de:
* Registrarse en la plataforma.
* Asociar predios a su cuenta dado el código (será posible si el predio está a nombre del usuario).
* Realizar pago del valor predial. (Simulado)
* Solicitar convenio de pago dado un cobro generado.

Todos los usuarios pueden editar su propio perfil, cambiar su contraseña e incluso subir un avatar que los identifique. También pueden solicitar restablecimiento de contraseña a través de un one-time-link enviado a su correo.

## Tecnologías y librerías usadas
* React
* Bootstrap
* FontAwesome
* React Router  
Entre otras.

## Ejecutar app
1. Clonar o descargar el proyecto en tu equipo.

2. Instalar las dependencias necesarias desde la terminal, con el comando **npm install** o su equivalente en **yarn**.

3. Clonar o descargar en tu equipo el proyecto correspondiente al Backend desde [predial-backend](https://github.com/CarlosHdzR/predial-backend) y seguir los pasos para su instalación y ejecución; o si lo desea, desarrollar su propio Backend.

4. Ejecutar el comando **npm start** o su equivalente en **yarn**.
