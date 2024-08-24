module.exports = [
  'GET / views.controller home',
  'GET /game views.controller game',
  'GET /leaderboard views.controller leaderboard',

  'POST /api/v1/leaderboard leaderboard.controller create',
  'GET /api/v1/leaderboard leaderboard.controller index',
];
