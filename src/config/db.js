const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (!mongoUri) {
    console.error('MONGO_URI / MONGODB_URI is not set in environment');
    throw new Error('MONGO_URI not set');
  }

  try {
    if (global._mongooseCache.conn) {
      return global._mongooseCache.conn;
    }

    if (!global._mongooseCache.promise) {
      global._mongooseCache.promise = mongoose.connect(mongoUri, {
        dbName: process.env.MONGO_DB_NAME || 'catalog',
      });
    }

    global._mongooseCache.conn = await global._mongooseCache.promise;
    console.log('MongoDB Connected ✅');
    return global._mongooseCache.conn;
  } catch (error) {
    console.log('DB Error ❌', error);
    throw error;
  }
};

module.exports = connectDB;
