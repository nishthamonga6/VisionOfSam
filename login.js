const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 4000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/loginApp')
  .then(() => console.log('Mongoose connected successfully'))
  .catch((err) => console.error('Mongoose connection error:', err));
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('logindata', userSchema);

app.post('/post', (req, res) => {
  const { username, password } = req.body;

  // Log the request data
  console.log('Received data:', { username, password });

  const user = new User({ username, password });

  user
    .save()
    .then(() => {
      console.log('User saved:', user);
      res.send('Login successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Failed to login. Please try again.');
    });
});


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
