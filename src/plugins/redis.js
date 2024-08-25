const { createClient } = require('redis');

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

module.exports = redisClient;
