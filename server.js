// require('dotenv').config();
// const app = require('./src/app');
// const connectDB = require('./src/config/db');

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB and start the server
// connectDB();
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const User = require('./src/models/user');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB();

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Hardcoded login credentials
  const email = 'hack2skill.com';
  const password = 'tech@123';

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    await User.create({ email, password });
    console.log('Default user created');
  } else {
    console.log('Default user already exists');
  }
});
