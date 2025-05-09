const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables
dotenv.config({ path: 'config.env' });

// Database connection
const dbConnection = require('./config/database');

// Connect to Database
dbConnection();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json()); // To parse JSON request bodies

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
  console.log(Mode: ${process.env.NODE_ENV});
}

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Hello from the root route!');
});

// Import Routes
const categoryRoute = require('./routes/categoryRoute');

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

// Handle undefined Routes
app.all('*', (req, res) => {
  res.status(404).json({ message: Can't find this route: ${req.originalUrl} });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(🚀 App running on port ${PORT});
});
