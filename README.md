# Cadastral Management Platform
Platform that allows managing the cadastral collection of a city's properties.  
The types of users that the system manages are **Administrator (role 1)**, **Internal User (role 2)** and **External User (role 3)**.

The administrator has full control of the platform and therefore is able to:
* Authenticate on the platform.
* Create internal users.
* Manage users (internal and external).
* Create properties.
* Manage properties.

The internal user is able to:
* Authenticate on the platform.
* Create properties.
* Manage properties.
* View information from external users.

The external user is able to:
* Register on the platform.
* Authenticate on the platform.
* Associate properties to his own account given the code.
* Make payment of property value. (Simulated)
* Request payment agreement given a charge generated.

All users can edit their own profile, change their password and even upload an avatar. They can also request a password reset through a one-time-link sent to their email.

## Technologies and libraries
* React
* Bootstrap
* React Router
* Context API
* Reducers
* Fetch API
* Jwt-decode
* Bcryptjs
* Chart.js
* React-chartjs-2
* React-paginate
* React-toastify
* Sweetalert2
* React-tooltip
* React-time-ago
* React-text-mask

## Run app
1. Clone or download the project on your computer.

2. Install the necessary dependencies from the terminal, with the command **npm install** or its **yarn** equivalent.

3. Clone or download the project corresponding to the Backend to your computer from [predial-backend](https://github.com/CarlosHdzR/predial-backend) and follow the steps to run it.

4. Run the **npm start** command or its **yarn** equivalent.
