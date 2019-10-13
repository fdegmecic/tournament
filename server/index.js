const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const players = require('./routes/api/players');
const matches = require('./routes/api/matches');

app.use('/api/players', players);
app.use('/api/matches', matches);


const port = process.env.PORT || 5000;

app.listen(port, () =>console.log(`Server started on port ${port}.`));