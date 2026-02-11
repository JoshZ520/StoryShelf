const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./db/connect');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
