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

// Gets and links html files for homepage if a non-existent api call is made
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// 

// Listens for server start
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});
