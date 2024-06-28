const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL pool setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_website_db',
    password: 'Pastel1!',
    port: 5432,
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-form', async (req, res) => {
    const { fullName, email, mobileNumber, emailSubject, message } = req.body;

    try {
        const query = `
            INSERT INTO contacts (name, email, mobile_number, email_subject, message)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [fullName, email, mobileNumber, emailSubject, message];

        await pool.query(query, values);

        res.status(200).send('Form submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving to database');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
