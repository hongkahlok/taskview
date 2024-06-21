const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Using a file-based SQLite database
const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Create the tasks table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )
    `);
});

module.exports = db;