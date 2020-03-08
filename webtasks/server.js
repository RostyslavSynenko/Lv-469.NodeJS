const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const commentsRoute = require('./routes/commentsRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

const PORT = 5000;
const nameDB = 'webtask';

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true })
);
app.use(cors());
app.use('/api/comments', commentsRoute);
app.use('/api/news', newsRoute);

mongoose
  .connect(`mongodb://localhost:27017/${nameDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connection to database established');
  })
  .catch(err => {
    console.log(`DB error ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}!`);
});
