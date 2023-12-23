
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// // const DatabaseURL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/dashboard';
// dotenv.config();
// const DatabaseURL = process.env.DATABASE_URL;
// mongoose.connect(DatabaseURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to the MongoDB database");
// });

// module.exports = db;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
