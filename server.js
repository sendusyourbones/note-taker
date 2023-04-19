require('dotenv').config();
const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

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
            return res.status(500).json({ err });
        }

        res.json(JSON.parse(notes));
    });
});

// POST request for /api/notes
// Receive note, assign id, add it to db.json, respond with new note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const id = uuid.v4();

        fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, notes) => {
            if (err) {
                return res.status(500).json({ err });
            }

            const data = JSON.parse(notes);

            data.push({ title, text, id });

            fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ err });
                }

                res.json({ title, text, id });
            });
        });
    } else {
        res.status(400).json({error: 'Title and text are required'});
    }
});

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));