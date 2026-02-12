const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'StoryShelf API',
    description: 'Book management API with user authentication'
  },
  host: 'storyshelf.onrender.com',
  schemes: ['https', 'http'],
  definitions: {
    BookInput: {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      series: 'The Lord of the Rings',
      seriesOrder: 1,
      publisher: 'Allen & Unwin',
      genres: ['Fantasy'],
      tags: ['classic'],
      formatOptions: ['Hardcover'],
      description: 'A fantasy novel.',
      coverImageUrl: 'https://example.com/cover.jpg'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/books.js'/*, './routes/users.js'*/];

swaggerAutogen(outputFile, endpointsFiles, doc);
