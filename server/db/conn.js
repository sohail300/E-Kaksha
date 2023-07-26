const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();

const dbURL = process.env.DB_URL;

// MongoDB Connection
async function connectDB() {
    try {
      const uri = dbURL;
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connected');
    } catch (err) {
      console.log('Error connecting to DB: ' + err);
    }
  }

  module.exports = connectDB;