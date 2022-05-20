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

// Listens for server start
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});
