const paths = require('./config/paths');
const logger = require('./config/winston');
const express = require('express');
const router = express.Router();

paths.forEach((path) => {
  const [method, route, controller, action] = path.split(' ');

  try {
    const targetController = require(`./src/controllers/${controller}`);

    if (!router[method.toLowerCase()]) {
      throw `Unsupport method '${method}' for path '${path}'`;
    }

    if (!targetController) {
      throw `Cannot load controller ${controller}`;
    }

    if (!targetController[action]) {
      throw `Cannot load controller action ${controller}.${action}`;
    }

    router[method.toLowerCase()](route, targetController[action]);
  } catch (error) {
    logger.error('Path error:', error);
  }
});

module.exports = router;
