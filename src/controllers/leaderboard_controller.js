const Leaderboard = require('../models/leaderboard.model');

const create = async (req, res) => {
  let result = await Leaderboard.create({
    username: 'ken',
    score: 1520,
  });

  res.send(result);
};

const index = async (req, res) => {
  let leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(100);

  res.send(leaderboard);
};

module.exports = {
  create,
  index,
};
