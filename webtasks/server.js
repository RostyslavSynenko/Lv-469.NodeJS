const express = require('express');
const mongoose = require('mongoose');

const app = express();

const URL = '/api/data';
const PORT = 3000;
const nameDB = 'webtask';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(`mongodb://localhost:27017/${nameDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connection to database established');
  })
  .catch((err) => {
    console.log(`DB error ${err.message}`);
  });

app.get(URL, (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}!`);
});
