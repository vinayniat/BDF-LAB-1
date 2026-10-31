const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'bookstore.db');
const sqlPath = path.join(__dirname, 'initDB.sql');

const sqlContent = fs.readFileSync(sqlPath, 'utf8');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database: bookstore.db');
});

db.exec(sqlContent, (err) => {
  if (err) {
    console.error('Error executing SQL script:', err.message);
    process.exit(1);
  }
  console.log('Database initialized successfully with table "book" and sample rows.');
  
  db.all('SELECT * FROM book', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Total rows in 'book' table: ${rows.length}`);
      console.table(rows);
    }
    db.close();
  });
});
