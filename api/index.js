const app = require('../src/app');
const connectDB = require('../src/config/db');

// Initialize database connection
connectDB().catch(err => {
  console.error('Failed to connect to database:', err);
});

module.exports = app;
