const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create SQLite DB
const db = new sqlite3.Database('./attendees.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS attendees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  gender TEXT
)`);

// Add an attendee
app.post('/api/attendees', (req, res) => {
  const { name, gender } = req.body;
  db.run(
    `INSERT INTO attendees (name, gender) VALUES (?, ?)`,
    [name, gender],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, gender });
    }
  );
});

// Get all attendees
app.get('/api/attendees', (req, res) => {
  db.all(`SELECT * FROM attendees`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// DELETE entire database entries
app.delete('/api/clear', (req, res) => {
  db.run(`DELETE FROM attendees`, [], function (err) {
    if (err) {
      console.error("Clear error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Database cleared' });
  });
});

app.get('/api/suggestions', (req, res) => {
  const prefix = req.query.prefix;
  if (!prefix) return res.json([]);

  db.all(
    `SELECT DISTINCT name FROM attendees WHERE name LIKE ? ORDER BY name ASC`,
    [prefix + '%'],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(row => row.name));
    }
  );
});



// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
