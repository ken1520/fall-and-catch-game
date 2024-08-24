const home = async (req, res) => {
  res.render('index', req.query);
};

const game = async (req, res) => {
  res.render('game', req.query);
};

const leaderboard = async (req, res) => {
  res.render('leaderboard', req.query);
};

module.exports = {
  home,
  game,
  leaderboard,
};
