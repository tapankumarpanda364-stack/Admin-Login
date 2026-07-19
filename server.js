const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const validUser = {
  username: 'Tapan kumar panda',
  password: 'website123'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === validUser.username && password === validUser.password) {
    return res.json({ success: true, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
