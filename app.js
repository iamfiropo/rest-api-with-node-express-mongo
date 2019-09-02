const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });
const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter.js')(Book);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
