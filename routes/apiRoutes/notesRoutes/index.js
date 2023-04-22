const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

router.route('/')
    // GET request for /api/notes
    // Read the db.json file and return all saved notes as JSON at path /api/notes
    .get((req, res) => {
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notes) => {
            if (err) {
                return res.status(500).json({ err });
            }
    
            res.json(JSON.parse(notes));
        });
    })
    // POST request for /api/notes
    // Receive note, assign id, add it to db.json, respond with new note
    .post((req, res) => {
        const { title, text } = req.body;

        if (title && text) {
            const id = uuid.v4();

            fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notes) => {
                if (err) {
                    return res.status(500).json({ err });
                }

                const data = JSON.parse(notes);

                data.push({ title, text, id });

                fs.writeFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), JSON.stringify(data, null, 2), (err) => {
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

// DELETE request for /api/notes/:id
// Receive id, read from db.json, remove note with id, rewrite db.json
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notes) => {
        if (err) {
            return res.status(500).json({ err });
        }

        const data = JSON.parse(notes);

        data.forEach((element) => {
            if (element.id === id) {
                const indexToDelete = data.indexOf(element);
                data.splice(indexToDelete, 1);
            }
        });

        fs.writeFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ err });
            }

            res.send('Note deleted!');
        });
    });
});

module.exports = router;