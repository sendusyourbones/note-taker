const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

// Send notes.html file at path /notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

// Send index.html file at path *
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;