const { DatabaseSync } = require('node:sqlite');
const mongoose = require('mongoose');
require('dotenv').config();

const dbSQLite = new DatabaseSync('./miapp_sql.db');
dbSQLite.exec(`
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);
console.log('✅ Conectado a SQLite nativo');

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error MongoDB:', err.message);
  }
}

module.exports = { dbSQLite, connectMongo };