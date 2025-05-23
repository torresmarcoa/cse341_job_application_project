require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('DB is already initialized');
    return callback(null, database);
  }
  mongoose
    .connect(URI)
    .then((client) => {
      database = client;
      callback(null, database);
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      callback(err);
      console.error('Error connecting to MongoDB:', error);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDatabase };
