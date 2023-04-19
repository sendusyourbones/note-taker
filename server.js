require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));