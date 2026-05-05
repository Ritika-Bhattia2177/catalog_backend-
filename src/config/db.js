const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not set in environment');
    process.exit(1);
  }

  const dbName = process.env.MONGO_DB_NAME || 'catalog';

  try {
    const conn = await mongoose.connect(mongoUri, {
      dbName,
    });
    console.log(`MongoDB connected: ${conn.connection.host}/${dbName}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
