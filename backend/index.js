const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
require('./database/connect');

app.use(bodyParser.json());

app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});