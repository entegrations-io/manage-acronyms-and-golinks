const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const config = require('../config');

const dbName = path.join(__dirname, "../db_data", config.dbFileName ? config.dbFileName : "acronymsANDgolinks.db");
const db = new sqlite3.Database(dbName, err => {
  if (err) {
    return console.error("Error establishing the database connection.", err);
  }
  console.log("Connection established to database 'acronymsANDgolinks.db'");
});

const sqlCreateAcronyms = `CREATE TABLE IF NOT EXISTS acronyms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(500) NOT NULL
);`;

db.run(sqlCreateAcronyms, err => {
  if (err) {
    return console.error("Error running the sql " + sqlCreateAcronyms, err);
  }
  console.log("Created table 'acronyms'");
});

const sqlCreateGoLinks = `CREATE TABLE IF NOT EXISTS golinks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20) UNIQUE NOT NULL,
  link VARCHAR(500) NOT NULL
);`;
db.run(sqlCreateGoLinks, err => {
  if (err) {
    return console.error("Error running the sql " + sqlCreateGoLinks, err);
  }
  console.log("Created table 'golinks'");
});

module.exports = db;
