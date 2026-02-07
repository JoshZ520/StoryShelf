const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'StoryShelf API',
    description: 'Book management API with user authentication'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
