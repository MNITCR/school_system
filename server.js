const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/system_school', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for your 'login_table'
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const LoginModel = mongoose.model('login_tables', loginSchema);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user with the provided email and password
    const user = await LoginModel.findOne({ email, password });

    if (user) {
      // User found, send success response
      res.json('successful');
    } else {
      // User not found, send error response
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle any server/database errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
