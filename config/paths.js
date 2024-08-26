module.exports = [
  'GET / views_controller home',
  'GET /game views_controller game',
  'GET /leaderboard views_controller leaderboard',

  'POST /api/v1/leaderboard leaderboard_controller create',
];
