const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62422c7263d13dfc6a62dd19',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
