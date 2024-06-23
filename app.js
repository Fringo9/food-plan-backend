const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { mongoURI } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    initializeUsers(); // Initialize default users
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function initializeUsers() {
  const User = require('./models/User');

  const users = [
    {
      username: 'Paolo',
      weeklyPlan: [
        { day: 'Monday', meals: { breakfast: 'Uova e pane', morningSnack: 'Frutta', lunch: 'Pollo e riso', afternoonSnack: 'Yogurt', dinner: 'Pasta al pomodoro' }},
        { day: 'Tuesday', meals: { breakfast: 'Pancakes', morningSnack: 'Noci', lunch: 'Insalata', afternoonSnack: 'Barretta proteica', dinner: 'Pesce e verdure' }},
        { day: 'Wednesday', meals: { breakfast: 'Toast alla francese', morningSnack: 'Smoothie', lunch: 'Panino con tacchino', afternoonSnack: 'Frutta fresca', dinner: 'Risotto ai funghi' }}
        // Aggiungi altri giorni per Paolo se necessario
      ]
    },
    {
      username: 'Nadia',
      weeklyPlan: [
        { day: 'Monday', meals: { breakfast: 'Frullato', morningSnack: 'Mandorle', lunch: 'Quinoa e verdure', afternoonSnack: 'Frutta secca', dinner: 'Zuppa di lenticchie' }},
        { day: 'Tuesday', meals: { breakfast: 'Toast e avocado', morningSnack: 'Carote', lunch: 'Frittata', afternoonSnack: 'Crackers', dinner: 'Bistecca e insalata' }},
        // ... altri giorni per Nadia
      ]
    }
  ];

  for (let userData of users) {
    let user = await User.findOne({ username: userData.username });
    if (!user) {
      user = new User(userData);
      await user.save();
    }
  }
}
