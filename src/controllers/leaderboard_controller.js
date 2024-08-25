const validator = require('../validators/leaderboard_validator');
const logger = require('../../config/winston');
const redisClient = require('../plugins/redis');

const LEADERBOARD_CACHE_KEY = 'game:leaderboard';

const create = async (req, res) => {
  try {
    const params = validator.validate(req.body, 'create');
    const { score, username } = params;

    req.session.user = { username };

    await redisClient.zAdd(LEADERBOARD_CACHE_KEY, { score, value: username });

    res.send('OK');
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send(error.message);
  }
};

const index = async (req, res) => {
  try {
    const topPlayers = await redisClient.zRangeWithScores(
      LEADERBOARD_CACHE_KEY,
      0,
      99,
      { REV: true }
    );
    res.send(topPlayers);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  index,
};
