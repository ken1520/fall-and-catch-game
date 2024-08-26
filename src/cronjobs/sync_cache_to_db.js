const { CronJob } = require('cron');
const redisClient = require('../plugins/redis');
const logger = require('../../config/winston');
const LeaderBoard = require('../models/leaderboard.model');

const LEADERBOARD_CACHE_KEY = 'game:leaderboard';

// Every 15 minutes
const cronExpression = '*/15 * * * *';

const job = new CronJob(cronExpression, async () => {
  try {
    const leaderboard = await redisClient.zRangeWithScores(LEADERBOARD_CACHE_KEY, 0, -1, { REV: true });
    
    const queries = leaderboard.map(({ value: username, score }) => {
      return {
        updateOne: {
          filter: {
            username,
          },
          update: {
            $set: {
              score,
            },
          },
          upsert: true,
        },
      };
    });
  
    await LeaderBoard.bulkWrite(queries);
  
    logger.info('Sync cache from redis to database successfully');
  } catch (error) {
    logger.error(`Fail to sync cache from redis to database, error stack: ${error.stack}`);
  }

}, null, true, 'Asia/Tokyo');

module.exports = job;