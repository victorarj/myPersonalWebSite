const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await db.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
        res.send('Thank you for your message!');
    } catch (err) {
        console.error('Error inserting data into contacts table:', err);
        res.status(500).send('An error occurred, please try again later.');
    }
});

// New route to fetch and display contacts
app.get('/contacts', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM contacts');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching contacts from the database:', err);
        res.status(500).send('An error occurred, please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
