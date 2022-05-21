// File dependencies
const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Makes required files from directory public to the browser
app.use(express.static('public'));

// Gets and links html files for homepage data to display
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Gets and links html files for notes page data to display
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Gets and sends note data to the page
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Gets specific note 
app.get('/api/notes/:id', (req, res) => {
    let savedNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedNote[Number(req.params.id)]);
});

// Gets and links html files for homepage if a non-existent api call is made
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Creates notes, posts notes, and sends data to server
app.post('/api/notes', (req, res) => {
    let savedNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let freshNote = req.body;
    let noteId = (savedNote.length).toString();

    freshNote.id = noteId;
    savedNote.push(freshNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNote));
    console.log('New note has been saved. Note info: ', freshNote);
    res.json(savedNote);
});

// Finds and deletes specified notes 
app.delete('/api/notes/:id', () => {
    let savedNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = req.params.id;
    let newNoteId = 0;

    console.log(`Deleting the note containing this id: ${noteId}`);

    savedNote = savedNote.filter(currentNote => {
       return currentNote.id != noteId;
    });

    for (currentNote of savedNote) {
        currentNote.id = newNoteId.toString();
        newNoteId++;
    }

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNote));
    res.json(savedNote);
});

// Listens for server start
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});
