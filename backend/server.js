const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'RapL Learning Dashboard API is running'
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 AS result');

    res.json({
      success: true,
      message: 'MySQL connection successful',
      data: rows
    });
  } catch (error) {
    console.error('Database error:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});