// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  weeklyPlan: [
    {
      day: String,
      meals: {
        breakfast: String,
        morningSnack: String,
        lunch: String,
        afternoonSnack: String,
        dinner: String
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
