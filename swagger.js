const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Job Application Tracker API',
    description: 'API para gestionar aplicaciones de empleo y reclutadores.',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
