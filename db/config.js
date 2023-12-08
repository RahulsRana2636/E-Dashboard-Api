// const mongoose= require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/dashboard")
const mongoose = require("mongoose");
const DatabaseURL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/dashboard';

mongoose.connect(DatabaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the MongoDB database");
});

module.exports = db;
