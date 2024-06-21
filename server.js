const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');  // Import the database module

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// Get all tasks
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Get a single task
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    db.run("INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)", 
           [title, description, false], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, title, description, completed: false }
        });
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    db.run("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?", 
           [title, description, completed, id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({"message": "success"});
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({"message": "success"});
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
