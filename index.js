/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { sendMail } = require('./serverFiles/mailer');

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '/public');
const app = express();
app.use(bodyParser());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/feedback', (req, res) => {
  const details = {
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
  };
  sendMail(details, (err, info) => {
    if (err) return console.log(err);
    console.log(info);
    return res.redirect('/');
  });
});

app.listen(port, () => {
  console.log('Server is up on port: ', port);
});
