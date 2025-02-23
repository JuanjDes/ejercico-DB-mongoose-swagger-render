const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { dbConnection } = require('./config/config');
const routes = require('./routes');
const swaggerSetup = require('./swagger');

app.use(express.json());

app.use('/', routes);

dbConnection();

swaggerSetup(app); // Esto inicializa Swagger y define las rutas en el archivo routes.js

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));