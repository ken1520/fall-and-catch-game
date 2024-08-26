const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const LeaderBoard = mongoose.model('leaderboard', leaderboardSchema);

module.exports = LeaderBoard;
