# Plataforma de Gestión Catastral
Plataforma que permite gestionar el cobro catastral de los predios de una ciudad.
Los tipos de usuarios que maneja el sistema son **administrador (rol 1)**, **usuario externo (rol 2)** y **usuario interno (rol 3)**.

El usuario interno está en la capacidad de:
* Crear predio indicando el código, nombre del propietario, cédula del propietario, área total del predio, área construida del predio, valor del predio, valor predial, dirección y barrio.
* Gestionar predios.
* Definir la fecha de pago máxima en un año.
* Definir la fechas de pagos máximas para tener descuentos.
* Aprobar/reprobar convenio de pago.

El usuario externo está en la capacidad de:
* Registrarse en la plataforma.
* Asociar predios a la cuenta dado el código (será posible si el predio está a nombre del usuario).
* Realizar pago del valor predial. (Simulado)
* Solicitar convenio de pago dado un cobro generado.

El administrador tiene control total de la plataforma y por lo tanto está en la capacidad de:
* Gestionar usuarios. 
* Gestionar predios.

Todos los usuarios pueden editar su propio perfil e incluso subir un avatar que los identifique.

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
