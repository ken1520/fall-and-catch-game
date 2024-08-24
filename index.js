const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./config/winston');
const { morganLog } = require('./config/morgan');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;
const router = require('./router');

app.use(morganLog());

app.use(bodyParser.json());

app.use(router);

let server;

mongoose
  .connect(`${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`)
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(process.env.PORT, () => {
      logger.info(`Server listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => logger.error('Error connecting to MongoDB:', err));

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
