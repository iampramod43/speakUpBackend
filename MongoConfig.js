
const mongoose = require('mongoose');
const uri = "mongodb+srv://pramod0514:QXEATdy2T5i64L5a@tiger.rxvlpuq.mongodb.net/?retryWrites=true&w=majority&appName=tiger";
const registerSchemas = require('./registerSchemas');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      registerSchemas();
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  module.exports = connectDB;

