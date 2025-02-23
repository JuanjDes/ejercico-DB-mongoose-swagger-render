const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'API para gestionar tareas',
            contact: {
                name: 'juanjguapo@gmail.com',
            },
            servers: ['http://localhost:3000'],
        },
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Título de la tarea',
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Estado de la tarea',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Ruta a los archivos que contienen las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};