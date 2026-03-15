const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Mock data endpoints
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.get('/api/homework', (req, res) => {
  res.json([
    { id: 1, title: 'Math Assignment', dueDate: '2024-01-15', status: 'pending' },
    { id: 2, title: 'Science Project', dueDate: '2024-01-20', status: 'completed' }
  ]);
});

// Catch all handler for serverless
module.exports = app;
