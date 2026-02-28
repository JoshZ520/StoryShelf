const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'StoryShelf API',
    description: 'Book management API with Google OAuth authentication. All routes (except auth endpoints) require authentication via Google OAuth session.'
  },
  host: 'storyshelf.onrender.com',
  schemes: ['https', 'http'],
  securityDefinitions: {
    oauth2: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: '/auth/google/start',
      description: 'Google OAuth 2.0 authentication. Users must authenticate via Google to access protected endpoints.'
    }
  },
  security: [
    {
      oauth2: []
    }
  ],
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
const endpointsFiles = ['./routes/index.js', './routes/books.js', './routes/users.js', './routes/auth.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
