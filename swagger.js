const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'StoryShelf API',
    description: 'Book management API with user authentication'
  },
  host: 'storyshelf.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/books.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
