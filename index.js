const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./config/winston');
const { morganLog } = require('./config/morgan');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
const router = require('./router');
const session = require('express-session');
const redisClient = require('./src/plugins/redis');
const { syncCacheToDb } = require('./src/cronjobs');

// Set up session
app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    name: 'fallgame',
    saveUninitialized: true,
    resave: false,
  })
);

app.use(morganLog());

app.use(bodyParser.json());

// Set up routes
app.use(router);

// Set up cron jobs
syncCacheToDb.start();

let server;

// Connect to MongoDB, Redis and start the server
mongoose
  .connect(`${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`)
  .then(() => {
    logger.info('Connected to MongoDB');

    redisClient.on('error', (err) => {
      logger.error(`Redis Client Error: ${err}`);
    });

    redisClient.connect();
    logger.info('Connected to Redis');

    server = app.listen(process.env.PORT, () => {
      logger.info(`Server listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => logger.error('Error connecting to MongoDB:', err));

// Error handling
app.use((req, res) => {
  res.render('404');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
