require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmark = require('./bookmarks/bookmark-routers');

const app = express();
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(bookmark);


app.use(function handleToken(req, res, next) {
  let authToken = req.get('Authorization').split(' ')[1];
  let apiKey = process.env.API_KEY;

  if (authToken !== apiKey) {
    return res.status(401).send('Unauthorized');
  }

  next();
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});




module.exports = app;