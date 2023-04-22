require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));