const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const loggerMiddleware = require('./middleware/loggerMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Catalog API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
