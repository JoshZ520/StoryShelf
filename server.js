const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('./passport');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./db/connect');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
      console.log(`https://storyshelf.onrender.com/api-docs/#/`)
      console.log(`Google Login: https://storyshelf.onrender.com/auth/google/start`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
