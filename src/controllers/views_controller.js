const redisClient = require('../plugins/redis');
const logger = require('../../config/winston');

const LEADERBOARD_CACHE_KEY = 'game:leaderboard';

const home = async (req, res) => {
  res.render('index');
};

const game = async (req, res) => {
  res.render('game');
};

const leaderboard = async (req, res) => {
  try {
    const topPlayers = await redisClient.zRangeWithScores(
      LEADERBOARD_CACHE_KEY,
      0,
      99,
      { REV: true }
    );

    let leaders = topPlayers.map((player) => {
      return {
        name: player.value,
        score: player.score,
      };
    });

    const currentUserScore = await redisClient.zScore(
      LEADERBOARD_CACHE_KEY,
      req.session.user?.username || ''
    );
    const currentUserRank = await redisClient.zRank(
      LEADERBOARD_CACHE_KEY,
      req.session.user?.username || ''
    );

    const currentUser = {
      rank: currentUserRank + 1,
      score: currentUserScore,
      name: req.session.user?.username ?? '',
    };

    res.render('leaderboard', { currentUser, leaders });
  } catch (error) {
    logger.error(error.stack);
    res.render('500');
  }
};

module.exports = {
  home,
  game,
  leaderboard,
};
