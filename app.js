const express = require('express');
const mongoose = require('mongoose');

const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});
