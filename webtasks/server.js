const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const URL = '/api/data';
const PORT = 5000;
const nameDB = 'webtask';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
  res.status(200).send({ message: 'HELLO!' });
});

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}!`);
});
