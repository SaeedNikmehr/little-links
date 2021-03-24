const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const {port} = require('../config/app')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Little Links',
            version: '1.0.0',
            description: 'A Link Shortener api project by Express and MongoDB',
            contact: {
                name: 'Saeed Nikmehr',
                email: 'hovalkafi@gmail.com'
            }
        },
        host: `http://localhost:${port}`,
        basePath : '/',
    },
    apis: ['./routes/*.js']
}

module.exports  = {
    swaggerDocs: swaggerJsdoc(swaggerOptions),
    swaggerUI
}
