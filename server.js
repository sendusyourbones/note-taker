require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send notes.html file at path /notes
app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

// Read the db.json file and return all saved notes as JSON at path /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, notes) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json(JSON.parse(notes));
    });
});

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));